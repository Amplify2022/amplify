package com.pruebas.controller;

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

import com.pruebas.dto.ClientDTO;
import com.pruebas.dto.Credentials;
import com.pruebas.exceptions.AmplifyException;
import com.pruebas.model.UserClient;
import com.pruebas.services.ClientServices;


@RestController
@RequestMapping("clients")
@CrossOrigin(origins = "*")


public class ClientController {

	@Autowired
	ClientServices services;

	@PostMapping("/save")
	public ResponseEntity<ClientDTO> saveClient(@Valid @RequestBody ClientDTO clientDTO) throws AmplifyException {
		return new ResponseEntity<ClientDTO>(services.save(clientDTO), HttpStatus.OK);
	}

	@GetMapping("/list") 
	public List<UserClient> list() {
		return services.list();
	}

	@DeleteMapping("/delete/{username}") 
	public ResponseEntity<String> delete(@PathVariable("username") String username) throws AmplifyException {
		return services.delete(username);
	}

	@PutMapping("/update")
	public ClientDTO update(@RequestBody ClientDTO clientDTO)throws AmplifyException {
		return services.update(clientDTO);
	}
	
	@PutMapping("/updateClientPassword")
	public ClientDTO updateClientPassword(@RequestBody ClientDTO clientDTO) throws AmplifyException {
		return services.updateClientPassword(clientDTO);
	}

	@GetMapping("/findById/{id}")
	public ResponseEntity<?> findClientById(@PathVariable("id") Long id) throws AmplifyException{
			ClientDTO clientDTO = services.findById(id);
			return new ResponseEntity<ClientDTO>(clientDTO, HttpStatus.OK);
	}

	@GetMapping("/findByUsername/{username}")
	public ResponseEntity<?> findClientByUsername(@PathVariable("username") String username) throws AmplifyException {
		ClientDTO clientDTO = services.findByUsername(username);
		return new ResponseEntity<ClientDTO>(clientDTO, HttpStatus.OK);		
	}

	@PostMapping("/login")
	public ClientDTO login(@Valid @RequestBody Credentials credentials) throws AmplifyException  {
		return services.login(credentials);
	}
		
}
