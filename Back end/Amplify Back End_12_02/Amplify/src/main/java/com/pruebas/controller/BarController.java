package com.pruebas.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.pruebas.dto.AuthTokenDTO;
import com.pruebas.dto.BarDTO;
import com.pruebas.dto.Credentials;
import com.pruebas.dto.DeviceDTO;
import com.pruebas.dto.PlayListDTO;
import com.pruebas.dto.TokenDTO;
import com.pruebas.dto.UriDTO;
import com.pruebas.exceptions.AmplifyException;
import com.pruebas.model.Item;
import com.pruebas.model.UserBar;
import com.pruebas.model.Utilities;
import com.pruebas.services.BarServices;

@RestController
@RequestMapping("bars")
@CrossOrigin(origins = "*")

public class BarController {

	@Autowired
	BarServices services;
	
	@Autowired
	Utilities utilities;
	
	// METODOS HTTP - SOLICITUD AL SERVIDOR

	@PostMapping("/save") // localhost:8080/personas/guardar
	public BarDTO save(@Valid @RequestBody BarDTO barDTO, HttpStatus status) throws AmplifyException {
		return services.save(barDTO);
	}

	@GetMapping("/list") // localhost:8080/bars/listar
	public List<UserBar> list() {
		return services.list();
	}

	@DeleteMapping("/delete/{username}") // localhost:8080/bars/eliminar
	public ResponseEntity<String> delete(@PathVariable("username") String username) throws AmplifyException {
		return services.delete(username);
	}

	@PutMapping("/update")
	public BarDTO update(@RequestBody BarDTO barDTO) throws AmplifyException {
		return services.update(barDTO);
	}

	@GetMapping("/findById/{id}")
	public BarDTO findById(@PathVariable("id") Long id) throws AmplifyException {
		return services.findById(id);
	}

	@GetMapping("/findByUsername/{username}")
	public BarDTO findByUsername(@PathVariable("username") String username) throws AmplifyException {
		return services.findByUsername(username);
	}

	@PostMapping("/login")
	public BarDTO login(@Valid @RequestBody Credentials credentials) throws AmplifyException {
		return services.login(credentials);
	}

	@PutMapping("/token")
	public TokenDTO setSpotifyToken(@RequestBody TokenDTO tokenDto) throws AmplifyException {
		return services.setSpotifyToken(tokenDto);
	}

	@GetMapping("/token/{rut}")
	public AuthTokenDTO getAuthToken(@PathVariable("rut") String rut) throws AmplifyException {
		return services.getAuthToken(rut);
	}

	@PostMapping("/device/{rut}")
	public DeviceDTO setBarDevice(@PathVariable("rut") String rut, @RequestBody DeviceDTO deviceDto)
			throws AmplifyException, IOException, InterruptedException {
		return services.setDevice(rut, deviceDto);
	}

	@GetMapping("/device/{rut}")
	public DeviceDTO getDevices(@PathVariable("rut") String rut) throws AmplifyException {
		return services.getDevice(rut);
	}

	@PostMapping("/playlist/{rut}")
	public PlayListDTO setBarPlayList(@PathVariable("rut") String rut, @RequestBody PlayListDTO playListDto)
			throws AmplifyException {
		return services.setPlayList(rut, playListDto);
	}

	@GetMapping("/playlist/{rut}")
	public PlayListDTO getPlayList(@PathVariable("rut") String rut) throws AmplifyException {
		return services.getPlayList(rut);
	}

	@PostMapping("/addSong/{rut}")
	public void addSong(@PathVariable("rut") String rut, @RequestBody UriDTO uriDto) throws AmplifyException {
		services.addSong(rut, uriDto);
	}
	
	@DeleteMapping("/deleteSong/{rut}")
	public void deleteSong(@PathVariable("rut") String rut, @RequestBody UriDTO uriDto) throws AmplifyException {
		services.deleteSong(rut, uriDto);
	}
	
	@DeleteMapping("/deleteSongFromSpotify/{rut}")
	public void deleteSongFromSpotify(@PathVariable("rut") String rut, @RequestBody UriDTO uriDto) throws AmplifyException {
		services.deleteSongFromSpotify(rut, uriDto);
	}

	@PostMapping("/voteSong/{rut}")
	public void voteSong(@PathVariable("rut") String rut, @RequestBody UriDTO uriDto) throws AmplifyException, IOException, InterruptedException {
		services.voteSong(rut, uriDto);
	}

	@GetMapping("/getItems/{rut}")
	public List<Item> getItems(@PathVariable("rut") String rut) throws AmplifyException {
		return services.getItems(rut);
	}

	@GetMapping("/getBasicToken")
	public String getBasicToken() throws AmplifyException, IOException, InterruptedException {
		return utilities.getBasicToken();
	}

	@GetMapping("/getPlayListItems/{rut}")
	public ArrayList<String> getPlayListItems(@PathVariable("rut") String rut)
			throws AmplifyException, IOException, InterruptedException {
		return utilities.getPlayListItems(rut);
	}

	@PutMapping("/orderList/{rut}")
	public void orderList(@PathVariable("rut") String rut) throws AmplifyException, IOException, InterruptedException {
		utilities.orderList(rut);
	}
	
	@PutMapping("/updateBarPassword")
	public BarDTO updateClientPassword(@RequestBody BarDTO barDTO) throws AmplifyException {
		return services.updateBarPassword(barDTO);
	}
	
	

}