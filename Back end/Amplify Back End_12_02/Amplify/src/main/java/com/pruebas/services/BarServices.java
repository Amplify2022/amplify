package com.pruebas.services;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.pruebas.dto.AuthTokenDTO;
import com.pruebas.dto.BarDTO;
import com.pruebas.dto.ClientDTO;
import com.pruebas.dto.Credentials;
import com.pruebas.dto.DeviceDTO;
import com.pruebas.dto.PlayListDTO;
import com.pruebas.dto.TokenDTO;
import com.pruebas.dto.UriDTO;
import com.pruebas.exceptions.AmplifyException;
import com.pruebas.model.Item;
import com.pruebas.model.UserBar;
import com.pruebas.model.UserClient;
import com.pruebas.model.UserType;
import com.pruebas.model.Utilities;

@Configuration
@Service
public class BarServices implements IBarServices {

	@Autowired
	private UserBarDAO barDao;

	@Autowired
	private ItemDAO itemDao;

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private Utilities utilities;

	@Override
	public BarDTO save(BarDTO barDTO) throws AmplifyException {
		if (passwordMatch(barDTO)) {
			UserBar b = barDao.findByRut(barDTO.getRut());
			if (b == null) {
				UserBar bar = new UserBar();
				bar.setUserType(UserType.BAR);
				bar.setFirstName(barDTO.getFirstName());
				bar.setLastName(barDTO.getLastName());
				bar.setUsername(barDTO.getUsername());
				bar.setPassword(barDTO.getPassword());
				bar.setPasswordConfirmation(barDTO.getPasswordConfirmation());
				bar.setPhone(barDTO.getPhone());
				bar.setEmail(barDTO.getEmail());
				bar.setBarName(barDTO.getBarName());
				bar.setAddress(barDTO.getAddress());
				bar.setRut(barDTO.getRut());
				bar.setProfilePic(barDTO.getProfilePic());
				bar.setLatitude(barDTO.getLatitude());
				bar.setLongitude(barDTO.getLongitude());
				bar.setDeviceID(null);
				bar.setAccess_token(null);
				bar.setPlayList_id(null);
				bar.setMusicGender(barDTO.getMusicGender());
				barDao.save(bar);
				return barDTO;
			} else {
				throw new AmplifyException(HttpStatus.CONFLICT, "El RUT ingresado ya está registrado");
			}
		}
		throw new AmplifyException(HttpStatus.BAD_REQUEST, "Las contraseñas no coinciden");
	}

	@Override
	public List<UserBar> list() {
		return barDao.findAll();
	}

	@Override
	public ResponseEntity<String> delete(String username) throws AmplifyException {
		UserBar bar = barDao.findByUsername(username);
		if (bar != null) {
			for (Item i : bar.getItems()) {
				itemDao.deleteById(i.getId());
			}
			barDao.deleteById(bar.getId());
			return new ResponseEntity<>("El bar " + bar.getBarName() + " fue borrado correctamente.", HttpStatus.OK);
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El bar con username: " + username + " no existe");
		}
	}

	@Override
	public BarDTO update(BarDTO barDTO) throws AmplifyException {
		UserBar bar = barDao.findByUsername(barDTO.getUsername());
		if (passwordMatch(barDTO)) {
			if (bar != null) {
				bar.setFirstName(barDTO.getFirstName());
				bar.setLastName(barDTO.getLastName());
				bar.setUsername(barDTO.getUsername());
				bar.setPassword(barDTO.getPassword());
				bar.setPasswordConfirmation(barDTO.getPasswordConfirmation());
				bar.setPhone(barDTO.getPhone());
				bar.setEmail(barDTO.getEmail());
				bar.setBarName(barDTO.getBarName());
				bar.setAddress(barDTO.getAddress());
				bar.setRut(barDTO.getRut());
				bar.setProfilePic(barDTO.getProfilePic());
				bar.setMusicGender(barDTO.getMusicGender());
				barDao.save(bar);
				return barDTO;
			} else {
				throw new AmplifyException(HttpStatus.BAD_REQUEST, "El username no existe");
			}
		}
		throw new AmplifyException(HttpStatus.BAD_REQUEST, "Las contraseñas no coinciden");
	}

	@Override
	public BarDTO findById(Long id) throws AmplifyException {
		UserBar bar = barDao.findById(id).orElse(null);
		if (bar != null) {
			BarDTO barDto = new BarDTO();
			barDto.setBarName(bar.getBarName());
			barDto.setAddress(bar.getAddress());
			barDto.setLastName(bar.getLastName());
			barDto.setFirstName(bar.getFirstName());
			barDto.setEmail(bar.getEmail());
			barDto.setPhone(bar.getPhone());
			barDto.setRut(bar.getRut());
			barDto.setUsername(bar.getUsername());
			barDto.setProfilePic(bar.getProfilePic());

			return barDto;
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El bar con Id: " + id.toString() + " no existe");
		}
	}

	@Override
	public BarDTO findByUsername(String username) throws AmplifyException {
		UserBar bar = barDao.findByUsername(username);
		if (bar != null) {
			BarDTO barDto = new BarDTO();
			barDto.setBarName(bar.getBarName());
			barDto.setAddress(bar.getAddress());
			barDto.setLastName(bar.getLastName());
			barDto.setFirstName(bar.getFirstName());
			barDto.setEmail(bar.getEmail());
			barDto.setPhone(bar.getPhone());
			barDto.setRut(bar.getRut());
			barDto.setUsername(bar.getUsername());
			barDto.setProfilePic(bar.getProfilePic());
			barDto.setPassword(bar.getPassword());
			barDto.setPasswordConfirmation(bar.getPasswordConfirmation());
			barDto.setLatitude(bar.getLatitude());
			barDto.setLongitude(bar.getLongitude());
			barDto.setMusicGender(bar.getMusicGender());
			return barDto;
		}
		throw new AmplifyException(HttpStatus.BAD_REQUEST, "El bar con username: " + username + " no existe");
	}

	@Override
	public BarDTO login(Credentials credentials) throws AmplifyException {
		String user = credentials.getUsername();
		String pass = credentials.getPassword();

		List<UserBar> bars = barDao.findAll();
		for (UserBar b : bars) {
			if (b.getUsername().equals(user) && b.getPassword().equals(pass)) {
				BarDTO barDTO = new BarDTO();
				barDTO.setBarName(b.getBarName());
				barDTO.setAddress(b.getAddress());
				barDTO.setEmail(b.getEmail());
				barDTO.setFirstName(b.getFirstName());
				barDTO.setLastName(b.getLastName());
				barDTO.setPassword(b.getPassword());
				barDTO.setPasswordConfirmation(b.getPasswordConfirmation());
				barDTO.setPhone(b.getPhone());
				barDTO.setProfilePic(b.getProfilePic());
				barDTO.setRut(b.getRut());
				barDTO.setUsername(b.getUsername());
				barDTO.setMusicGender(b.getMusicGender());
				return barDTO;
			}
		}
		throw new AmplifyException(HttpStatus.BAD_REQUEST, "El username y/o password no son correctos");
	}

	@Override
	public boolean passwordMatch(BarDTO barDTO) {
		if (barDTO.getPassword().equals(barDTO.getPasswordConfirmation())) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public TokenDTO setSpotifyToken(TokenDTO tokenDto) throws AmplifyException {
		UserBar bar = barDao.findByRut(tokenDto.getBarRut());
		if (bar != null) {
			bar.setAccess_token(tokenDto.getToken());
			bar.setRefresh_token(tokenDto.getRefresh_token());
			barDao.save(bar);
			return tokenDto;
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "Rut Incorrecto");
		}
	}

	public String getRefresh_token(String rut) throws AmplifyException {
		UserBar bar = barDao.findByRut(rut);
		if (bar != null) {
			return bar.getRefresh_token();
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El numero de RUT ingresado no es correcto");
		}
	}

	@Override
	public AuthTokenDTO getAuthToken(String rut) throws AmplifyException {
		UserBar bar = barDao.findByRut(rut);
		if (bar != null) {
			AuthTokenDTO authTokenDto = new AuthTokenDTO("");
			authTokenDto.setToken(bar.getAccess_token());
			return authTokenDto;
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El numero de RUT ingresado no es correcto");
		}

	}

	@Override
	public DeviceDTO setDevice(String rut, DeviceDTO deviceDto)
			throws AmplifyException, IOException, InterruptedException {
		UserBar bar = barDao.findByRut(rut);
		if (bar != null) {
			bar.setDeviceID(deviceDto.getDeviceID());
			barDao.save(bar);
			return deviceDto;
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "No se pudo encontrar el bar");
		}
	}

	@Override
	public DeviceDTO getDevice(String rut) throws AmplifyException {
		UserBar bar = barDao.findByRut(rut);
		if (bar != null) {
			DeviceDTO deviceDto = new DeviceDTO();
			deviceDto.setDeviceID(bar.getDeviceID());
			return deviceDto;
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El numero de RUT ingresado no es correcto");
		}
	}

	@Override
	public PlayListDTO setPlayList(String rut, PlayListDTO playListDto) throws AmplifyException {
		UserBar bar = barDao.findByRut(rut);
		if (bar != null) {
			bar.setPlayList_id(playListDto.getPlayListID());
			barDao.save(bar);
			return playListDto;
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "No se pudo encontrar el bar");
		}
	}

	@Override
	public PlayListDTO getPlayList(String rut) throws AmplifyException {
		UserBar bar = barDao.findByRut(rut);
		if (bar != null) {
			PlayListDTO playListDto = new PlayListDTO();
			playListDto.setPlayListID(bar.getPlayList_id());
			return playListDto;
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El numero de RUT ingresado no es correcto");
		}
	}

	@Override
	public void addSong(String rut, UriDTO uriDto) throws AmplifyException {

		UserBar bar = barDao.findByRut(rut);
		if (bar != null) {

			String barPlaylist = bar.getPlayList_id();
			String url = "https://api.spotify.com/v1/playlists/" + barPlaylist + "/tracks";

			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			httpHeaders.setContentType(MediaType.APPLICATION_JSON);
			String encodeToken = Base64.getEncoder()
					.encodeToString(bar.getAccess_token().getBytes(StandardCharsets.UTF_8));

			String token = bar.getAccess_token().replace("\r", "").replace("\n", "");
			token = token.replace("\r\n", "");
			httpHeaders.setBearerAuth(token);

			// BODY
			String uri = uriDto.getUri();
			String[] uris = { uri };

			Map<String, Object> map = new HashMap<>();
			map.put("uris", uris);

			HttpEntity<Map<String, Object>> entity = new HttpEntity<>(map, httpHeaders);

			ResponseEntity<JSONObject> response = restTemplate.postForEntity(url, entity, JSONObject.class);

			if (response.getStatusCode() == HttpStatus.CREATED) {

				List<Item> barItems = bar.getItems();
				boolean existe = false;

				for (Item i : barItems) {
					if (i.getUri().equals(uri)) {
						existe = true;
					}
				}
				if (!existe) {
					Item newItem = new Item(uriDto.getName(), uriDto.getArtist(), uriDto.getImage(), uri, 1, bar, LocalDateTime.now());
					itemDao.save(newItem);
				}
			} else {
				System.out.println(response.getStatusCode());
			}
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El numero de RUT ingresado no es correcto");
		}
	}

	public void deleteSong(String rut, UriDTO uriDto) throws AmplifyException {
		UserBar bar = barDao.findByRut(rut);
		if (bar != null) {

			String barPlaylist = bar.getPlayList_id();
			String url = "https://api.spotify.com/v1/playlists/" + barPlaylist + "/tracks";

			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			httpHeaders.setContentType(MediaType.APPLICATION_JSON);
			String encodeToken = Base64.getEncoder()
					.encodeToString(bar.getAccess_token().getBytes(StandardCharsets.UTF_8));

			String token = bar.getAccess_token().replace("\r", "").replace("\n", "");
			token = token.replace("\r\n", "");
			httpHeaders.setBearerAuth(token);

			// BODY
			String uri = uriDto.getUri();
			String[] uris = { uri };

			Map<String, Object> map = new HashMap<>();
			map.put("uris", uris);

			HttpEntity<Map<String, Object>> entity = new HttpEntity<>(map, httpHeaders);

			ResponseEntity<JSONObject> response = restTemplate.exchange(url, HttpMethod.DELETE, entity,
					JSONObject.class);

			if (response.getStatusCode() == HttpStatus.OK) {

				List<Item> barItems = bar.getItems();
				// boolean existe = false;
				Item item = itemDao.findByUri(uri);
				if (item != null) {
					for (Item i : barItems) {
						if (i.getUri().equals(uri)) {
							item.setVotes(1); // REVISAR ESTE METODO~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
							itemDao.save(item);
						}
					}
				}
				System.out.println("DELETE SONG---->  Request Successful");
			}
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El numero de RUT ingresado no es correcto");
		}
	}

	public void deleteSongFromSpotify(String rut, UriDTO uriDto) throws AmplifyException {
		UserBar bar = barDao.findByRut(rut);
		if (bar != null) {

			String barPlaylist = bar.getPlayList_id();
			String url = "https://api.spotify.com/v1/playlists/" + barPlaylist + "/tracks";

			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			httpHeaders.setContentType(MediaType.APPLICATION_JSON);
			String encodeToken = Base64.getEncoder()
					.encodeToString(bar.getAccess_token().getBytes(StandardCharsets.UTF_8));

			String token = bar.getAccess_token().replace("\r", "").replace("\n", "");
			token = token.replace("\r\n", "");
			httpHeaders.setBearerAuth(token);

			// BODY

			String uri = uriDto.getUri();

			Map<String, String> uriObject = new HashMap<>();
			uriObject.put("uri", uri);
			Object[] uris = { uriObject };
			Map<String, Object> map = new HashMap<>();
			map.put("tracks", uris);
			HttpEntity<Map<String, Object>> entity = new HttpEntity<>(map, httpHeaders);
			ResponseEntity<JSONObject> response = restTemplate.exchange(url, HttpMethod.DELETE, entity,
					JSONObject.class);

			if (response.getStatusCode() == HttpStatus.OK) {

				List<Item> barItems = bar.getItems();

				for (Item i : barItems) {
					if (i.getUri().equals(uri)) {
						itemDao.delete(i);
					}
				}
			} else {
				System.out.println(response.getStatusCode());
			}
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El numero de RUT ingresado no es correcto");
		}
	}

	@Override
	public void voteSong(String rut, UriDTO uriDto) throws AmplifyException, IOException, InterruptedException {
		UserBar bar = barDao.findByRut(rut);
		boolean existe = false;
		if (bar != null) {
			List<Item> barItems = bar.getItems();
			for (Item item : barItems) {
				if (item.getUri().equals(uriDto.getUri())) {
					item.setVotes(item.getVotes() + 1);
					itemDao.save(item);
					existe = true;
					utilities.orderList(rut);
				}
			}
			if (!existe) {
				throw new AmplifyException(HttpStatus.NOT_FOUND, "No se encontró el tema");
			}
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El numero de RUT ingresado no es correcto");
		}
	}

	@Override
	public List<Item> getItems(String rut) throws AmplifyException {
		UserBar bar = barDao.findByRut(rut);
		if (bar != null) {
			List<Item> items = itemDao.findItemsByBar(bar.getId());
			return items;
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El numero de RUT ingresado no es correcto");
		}
	}

	public void programmedListReorder() throws AmplifyException, IOException, InterruptedException {
		List<UserBar> bars = barDao.findAll();
		for (UserBar userBar : bars) {
			Map<String, Object> map = new HashMap<>();
			map = getCurrentlyPlaying(userBar);
			if (map != null) {
				boolean isPlaying = (boolean) map.get("is_playing");
				if (isPlaying == true) {
					int reminingTime = (int) map.get("remainingTime");
					String uri = (String) map.get("uri");
					if (reminingTime < 20000) {
						List<Item> items = userBar.getItems();
						for (Item item : items) {
							if (item.getUri().equals(uri)) {
								UriDTO uriDto = new UriDTO();
								uriDto.setArtist(item.getArtist());
								uriDto.setImage(item.getImage());
								uriDto.setName(item.getName());
								uriDto.setUri(item.getUri());
								Item itemToEdit = itemDao.findByUri(uri);
								itemToEdit.setVotes(1);
								itemToEdit.setDate(LocalDateTime.now());
								itemDao.save(itemToEdit);
								utilities.orderList(userBar.getRut());
								System.out.println("---------SE EJECUTÓ----------");
							}
						}
					}
				}
			}
		}
	}

	public void programmedRefreshTokens() throws AmplifyException, IOException, InterruptedException {
		List<UserBar> bars = barDao.findAll();
		for (UserBar bar : bars) {
			utilities.getRefreshedAccessToken(bar);
		}
	}

	public <T> Map<String, Object> getCurrentlyPlaying(UserBar bar) throws IOException, InterruptedException {

		if (bar != null && bar.getAccess_token() != null) {
			String url = "https://api.spotify.com/v1/me/player/currently-playing";
			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			httpHeaders.setContentType(MediaType.APPLICATION_JSON);
			httpHeaders.setBearerAuth(bar.getAccess_token());

			HttpEntity<JSONObject> entity = new HttpEntity<>(httpHeaders);
			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
			Map<String, Object> map = new HashMap<>();
			if (response.getStatusCodeValue() == 200) {
				JSONObject json = new JSONObject(response.getBody().toString());
				String currentlyPlayingUri = json.getJSONObject("item").getString("uri");

				if (json.getBoolean("is_playing") == true) {
					map.put("uri", currentlyPlayingUri);
					map.put("message", "El tema se está reproduciendo");
					map.put("is_playing", true);
					map.put("remainingTime",
							json.getJSONObject("item").getInt("duration_ms") - json.getInt("progress_ms"));
					return map;
				} else {
					map.put("uri", currentlyPlayingUri);
					map.put("message", "El tema está pausado");
					map.put("is_playing", false);
					map.put("remainingTime",
							json.getJSONObject("item").getInt("duration_ms") - json.getInt("progress_ms"));
					return map;
				}
			} else {
				map.put("uri", "");
				map.put("is_playing", false);
				map.put("message", "No hay temas en la Queue");
				return map;
			}
		} else {
			return null;
		}
	}

	public BarDTO updateBarPassword(BarDTO barDTO) throws AmplifyException {
		UserBar bar = barDao.findByUsername(barDTO.getUsername());
		if (bar != null) {
			if (bar.getEmail().equals(barDTO.getEmail())) {
				if (passwordMatch(barDTO)) {
					bar.setPassword(barDTO.getPassword());
					bar.setPasswordConfirmation(barDTO.getPasswordConfirmation());
					barDao.save(bar);
					return barDTO;
				} else {
					throw new AmplifyException(HttpStatus.BAD_REQUEST, "Las contraseñas no coinciden");
				}
			} else {
				throw new AmplifyException(HttpStatus.BAD_REQUEST, "No se encontró el email ingresado");
			}
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El username no existe");
		}
	}
}
