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
import java.util.Base64;
import java.util.HashMap;
import java.util.stream.Collectors;

import org.json.JSONObject;

public class SpotifyCredentials {

	private String client_id = "9b8d493c362e4885839078aa7b59eb69";
	private String client_secret = "5258e52db2a2481c90d5c0fc86e42554";

	public SpotifyCredentials() {
	}

	public String getClient_id() {
		return client_id;
	}

	public String getClient_secret() {
		return client_secret;
	}

	public String getBasicToken() throws IOException, InterruptedException {

		String authStr = getClient_id() + ":" + getClient_secret();
		String URL = "https://accounts.spotify.com/api/token";

		HashMap<String, String> parameters = new HashMap<>();
		parameters.put("grant_type", "client_credentials");
		String form = parameters.keySet().stream()
				.map(key -> key + "=" + URLEncoder.encode(parameters.get(key), StandardCharsets.UTF_8))
				.collect(Collectors.joining("&"));

		String encoding = Base64.getEncoder().encodeToString(authStr.getBytes());
		HttpClient client = HttpClient.newHttpClient();

		HttpRequest request = HttpRequest.newBuilder().uri(URI.create(URL))
				.headers("Content-Type", "application/x-www-form-urlencoded", "Authorization", "Basic " + encoding)
				.POST(BodyPublishers.ofString(form)).build();
		HttpResponse<?> response = client.send(request, BodyHandlers.ofString());

		System.out.println(response.body().toString());
		JSONObject json = new JSONObject(response.body().toString());

		System.out.println("ESTE TIENE QUE SER EL TOKEN ->" + json);
		return json.getString("access_token");
	}

}
