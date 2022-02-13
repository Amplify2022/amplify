package com.pruebas.model;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse.BodyHandlers;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.pruebas.dao.ItemDAO;
import com.pruebas.dao.UserBarDAO;
import com.pruebas.exceptions.AmplifyException;

@Configuration
@Service
public class Utilities {

	@Autowired
	private UserBarDAO barDao;

	@Autowired
	private ItemDAO itemDao;

	@Autowired
	private RestTemplate restTemplate;

	public String getBasicToken() throws IOException, InterruptedException {
		SpotifyCredentials credential = new SpotifyCredentials();
		String token = credential.getBasicToken();
		return token;
	}

	public ArrayList<String> getPlayListItems(String rut) throws IOException, InterruptedException, AmplifyException {
		UserBar bar = barDao.findByRut(rut);
		if (bar != null) {
			return getPlayListItems(bar);
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El numero de RUT ingresado no es correcto");
		}
	}

	public void orderList(String rut) throws AmplifyException, IOException, InterruptedException {
		UserBar bar = barDao.findByRut(rut);
		if (bar != null) {

			List<Item> items = itemDao.findItemsByBar(bar.getId());

			ArrayList<String> uris = new ArrayList<>();

			for (Item i : items) {
				uris.add(i.getUri());
			}

			String barPlaylist = bar.getPlayList_id();
			String url = "https://api.spotify.com/v1/playlists/" + barPlaylist + "/tracks";
			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			httpHeaders.setContentType(MediaType.APPLICATION_JSON);
			httpHeaders.setBearerAuth(bar.getAccess_token());

			Map<String, Object> map = new HashMap<>();
			map.put("uris", uris);

			HttpEntity<Map<String, Object>> entity = new HttpEntity<>(map, httpHeaders);
			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, entity, String.class);
			if (response.getStatusCodeValue() == 200) {
				System.out.println("REORDENAMOS LA LISTA");
			}

		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El numero de RUT ingresado no es correcto");
		}
	}

	public ArrayList<String> moveValueAtIndexToLast(ArrayList<String> arrayToBeShifted, int index) {

		ArrayList<String> originalArray = arrayToBeShifted;
		String valueBeingMoved = originalArray.get(index);
		for (int i = index; i < originalArray.size(); i++) {
			if (i + 1 < originalArray.size()) {
				arrayToBeShifted.set(i, originalArray.get(i + 1));
			}
		}
		arrayToBeShifted.set(arrayToBeShifted.size() - 1, valueBeingMoved);
		return arrayToBeShifted;
	}

	public String getSnapShot(UserBar bar) throws IOException, InterruptedException {

		String token = getBasicToken();

		String url = "https://api.spotify.com/v1/playlists/" + bar.getPlayList_id();
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		httpHeaders.setBearerAuth(token);

		Map<String, Object> map = new HashMap<>();
		map.put("field", "snapshot_id");

		HttpEntity<Map<String, Object>> entity = new HttpEntity<>(map, httpHeaders);

		ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

		JSONObject json = new JSONObject(response.getBody().toString());
		String snapShot = json.getString("snapshot_id");

		return snapShot;
	}

	public ArrayList<String> getPlayListItems(UserBar bar) throws IOException, InterruptedException {

		RestTemplate restTemplate = new RestTemplate();

		JSONArray returnedItems = new JSONArray();

		String url = "https://api.spotify.com/v1/playlists/" + bar.getPlayList_id() + "/tracks";
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		httpHeaders.setBearerAuth(bar.getAccess_token());

		HttpEntity<JSONObject> entity = new HttpEntity<>(httpHeaders);

		ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

		JSONObject json = new JSONObject(response.getBody().toString());
		returnedItems = json.getJSONArray("items");

		ArrayList<String> uris = new ArrayList<String>();

		for (int i = 0; i < returnedItems.length(); i++) {
			uris.add(returnedItems.getJSONObject(i).getJSONObject("track").getString("uri"));
		}

		return uris;

	}

	public String getRefreshedAccessToken(UserBar bar) throws IOException, InterruptedException {

		System.out.println(bar.getAccess_token());

		if (bar != null && bar.getAccess_token() != null) {
			SpotifyCredentials sc = new SpotifyCredentials();
			String authStr = sc.getClient_id() + ":" + sc.getClient_secret();
			String URL = "https://accounts.spotify.com/api/token";
			HashMap<String, String> parameters = new HashMap<>();
			parameters.put("grant_type", "refresh_token");
			parameters.put("refresh_token", bar.getRefresh_token());
			String form = parameters.keySet().stream()
					.map(key -> key + "=" + URLEncoder.encode(parameters.get(key), StandardCharsets.UTF_8))
					.collect(Collectors.joining("&"));
			String encoding = Base64.getEncoder().encodeToString(authStr.getBytes());
			HttpClient client = HttpClient.newHttpClient();
			HttpRequest request = HttpRequest.newBuilder().uri(URI.create(URL))
					.headers("Content-Type", "application/x-www-form-urlencoded", "Authorization", "Basic " + encoding)
					.POST(BodyPublishers.ofString(form)).build();
			HttpResponse<?> response = client.send(request, BodyHandlers.ofString());

			JSONObject json = new JSONObject(response.body().toString());
			String access_token = json.getString("access_token");
			bar.setAccess_token(access_token);
			barDao.save(bar);
			System.out.println("ESTE ES EL ACCESS_TOKEN >>>" + access_token);
			return access_token;
		} else {
			return "el bar no está autenticado";
		}

	}

}
