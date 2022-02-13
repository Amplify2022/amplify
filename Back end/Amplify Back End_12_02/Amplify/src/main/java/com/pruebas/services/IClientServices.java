package com.pruebas.services;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;

import com.pruebas.dto.ClientDTO;
import com.pruebas.dto.Credentials;
import com.pruebas.exceptions.AmplifyException;
import com.pruebas.model.UserClient;


public interface IClientServices {
	public ClientDTO save(ClientDTO clientDTO) throws AmplifyException;
	public List<UserClient> list();
	public ResponseEntity<String> delete(String username) throws AmplifyException;
	public ClientDTO update(ClientDTO clientDTO) throws AmplifyException;
	public ClientDTO updateClientPassword(ClientDTO clientDTO) throws AmplifyException;
	public ClientDTO findById(Long id) throws AmplifyException;
	public ClientDTO findByUsername(String username) throws AmplifyException;
	public ClientDTO login(Credentials credentials) throws AmplifyException;
	public boolean passwordMatch(ClientDTO clientDTO);
}
