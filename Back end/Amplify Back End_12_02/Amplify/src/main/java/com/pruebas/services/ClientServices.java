package com.pruebas.services;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.pruebas.dao.UserClientDAO;
import com.pruebas.dto.ClientDTO;
import com.pruebas.dto.Credentials;
import com.pruebas.exceptions.AmplifyException;
import com.pruebas.model.UserClient;
import com.pruebas.model.UserType;

@Configuration
@Service
public class ClientServices implements IClientServices {

	@Autowired
	private UserClientDAO clientDao;

	@Override
	public ClientDTO save(ClientDTO clientDTO) throws AmplifyException {
		if (passwordMatch(clientDTO)) {
			UserClient c = clientDao.findByUsername(clientDTO.getUsername());
			if (c == null) {
				UserClient client = new UserClient();
				client.setUserType(UserType.CLIENT);
				client.setFirstName(clientDTO.getFirstName());
				client.setLastName(clientDTO.getLastName());
				client.setUsername(clientDTO.getUsername());
				client.setPassword(clientDTO.getPassword());
				client.setPasswordConfirmation(clientDTO.getPasswordConfirmation());
				client.setEmail(clientDTO.getEmail());
				client.setPhone(clientDTO.getPhone());
				client.setDob(clientDTO.getDob());
				client.setGender(clientDTO.getGender());
				client.setProfilePic(clientDTO.getProfilePic());
				clientDao.save(client);
				return clientDTO;
			} else {
				throw new AmplifyException(HttpStatus.CONFLICT, "El username ya existe");
			}
		}
		throw new AmplifyException(HttpStatus.BAD_REQUEST, "Las contraseñas no coinciden");
	}

	@Override
	public List<UserClient> list() {
		return clientDao.findAll();
	}

	@Override
	public ResponseEntity<String> delete(String username) throws AmplifyException {

		UserClient c = clientDao.findByUsername(username);
		if (c != null) {
			clientDao.deleteById(c.getId());
			return new ResponseEntity<>(
					"El cliente " + c.getFirstName() + " " + c.getLastName() + " fue borrado correctamente.",
					HttpStatus.OK);
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El cliente con username: " + username + " no existe");
		}
	}

	@Override
	public ClientDTO update(ClientDTO clientDTO) throws AmplifyException {
		UserClient c = clientDao.findByUsername(clientDTO.getUsername());
		if (passwordMatch(clientDTO)) {
			if (c != null) {
				c.setFirstName(clientDTO.getFirstName());
				c.setLastName(clientDTO.getLastName());
				c.setUsername(clientDTO.getUsername());
				c.setPassword(clientDTO.getPassword());
				c.setPasswordConfirmation(clientDTO.getPasswordConfirmation());
				c.setPhone(clientDTO.getPhone());
				c.setGender(clientDTO.getGender());
				c.setEmail(clientDTO.getEmail());
				c.setProfilePic(clientDTO.getProfilePic());
				clientDao.save(c);
				return clientDTO;
			} else {
				throw new AmplifyException(HttpStatus.BAD_REQUEST, "El username no existe");
			}
		}
		throw new AmplifyException(HttpStatus.BAD_REQUEST, "Las contraseñas no coinciden");
	}

	@Override
	public ClientDTO updateClientPassword(ClientDTO clientDTO) throws AmplifyException {
		UserClient c = clientDao.findByUsername(clientDTO.getUsername());
		if (c != null) {
			if (c.getPhone().equals(clientDTO.getPhone())) {
				if (passwordMatch(clientDTO)) {
					c.setPassword(clientDTO.getPassword());
					c.setPasswordConfirmation(clientDTO.getPasswordConfirmation());
					clientDao.save(c);
					return clientDTO;
				} else {
					throw new AmplifyException(HttpStatus.BAD_REQUEST, "Las contraseñas no coinciden");
				}
			} else {
				throw new AmplifyException(HttpStatus.BAD_REQUEST, "No se encontró el teléfono ingresado");
			}
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El username no existe");
		}
	}

	@Override
	public ClientDTO findById(Long id) throws AmplifyException {
		UserClient c = clientDao.findById(id).orElse(null);
		if (c != null) {
			ClientDTO clientDto = new ClientDTO();
			clientDto.setFirstName(c.getFirstName());
			clientDto.setLastName(c.getLastName());
			clientDto.setUsername(c.getUsername());
			clientDto.setPhone(c.getPhone());
			clientDto.setGender(c.getGender());
			clientDto.setEmail(c.getEmail());
			clientDto.setDob(c.getDob());
			clientDto.setProfilePic(c.getProfilePic());
			return clientDto;
		} else {
			throw new AmplifyException(HttpStatus.BAD_REQUEST, "El cliente con Id: " + id.toString() + " no existe");
		}
	}

	@Override
	public ClientDTO findByUsername(String username) throws AmplifyException {

		UserClient c = clientDao.findByUsername(username);
		if (c != null) {
			ClientDTO clientDto = new ClientDTO();
			clientDto.setFirstName(c.getFirstName());
			clientDto.setLastName(c.getLastName());
			clientDto.setUsername(c.getUsername());
			clientDto.setPhone(c.getPhone());
			clientDto.setGender(c.getGender());
			clientDto.setEmail(c.getEmail());
			clientDto.setDob(c.getDob());
			clientDto.setProfilePic(c.getProfilePic());
			clientDto.setPassword(c.getPassword());
			clientDto.setPasswordConfirmation(c.getPasswordConfirmation());
			return clientDto;
		}
		throw new AmplifyException(HttpStatus.BAD_REQUEST, "El cliente con username: " + username + " no existe");
	}

	@Override
	public ClientDTO login(@Valid Credentials credentials) throws AmplifyException {

		String user = credentials.getUsername();
		String pass = credentials.getPassword();

		List<UserClient> clients = clientDao.findAll();
		for (UserClient c : clients) {
			if (c.getUsername().equals(user) && c.getPassword().equals(pass)) {
				ClientDTO clientDto = new ClientDTO();
				clientDto.setFirstName(c.getFirstName());
				clientDto.setLastName(c.getLastName());
				clientDto.setUsername(c.getUsername());
				clientDto.setPhone(c.getPhone());
				clientDto.setGender(c.getGender());
				clientDto.setEmail(c.getEmail());
				clientDto.setDob(c.getDob());
				clientDto.setProfilePic(c.getProfilePic());
				return clientDto;
			}
		}
		throw new AmplifyException(HttpStatus.BAD_REQUEST, "El username y/o password no son correctos");
	}

	@Override
	public boolean passwordMatch(ClientDTO clientDTO) {
		if (clientDTO.getPassword().equals(clientDTO.getPasswordConfirmation())) {
			return true;
		} else {
			return false;
		}
	}

}
