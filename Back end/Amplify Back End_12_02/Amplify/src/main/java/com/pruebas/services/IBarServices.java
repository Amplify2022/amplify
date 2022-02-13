package com.pruebas.services;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;

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

public interface IBarServices {
	public BarDTO save(BarDTO barDTO) throws AmplifyException;
	public List<UserBar> list();
	public ResponseEntity<String> delete(String username) throws AmplifyException;
	public BarDTO update(BarDTO barDTO) throws AmplifyException;
	public BarDTO findById(Long id) throws AmplifyException;
	public BarDTO findByUsername(String username) throws AmplifyException;
	public BarDTO login(Credentials credentials) throws AmplifyException;
	public boolean passwordMatch(BarDTO barDTO);
	public TokenDTO setSpotifyToken(TokenDTO tokenDto) throws AmplifyException;
	public AuthTokenDTO getAuthToken(String rut) throws AmplifyException;
	public DeviceDTO setDevice(String rut, DeviceDTO deviceDto) throws AmplifyException,IOException, InterruptedException;
	public DeviceDTO getDevice(String rut) throws AmplifyException;
	public PlayListDTO setPlayList(String rut, PlayListDTO playListDto) throws AmplifyException;
	public PlayListDTO getPlayList(String rut) throws AmplifyException;
	public void addSong(String rut, UriDTO uriDto) throws AmplifyException;
	public void voteSong(String rut, UriDTO uriDto) throws AmplifyException, IOException, InterruptedException;
	public List<Item> getItems(String rut) throws AmplifyException;
	
	
 
	
}