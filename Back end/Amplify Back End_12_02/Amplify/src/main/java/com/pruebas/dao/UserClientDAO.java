package com.pruebas.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.pruebas.model.UserClient;

@Repository
public interface UserClientDAO extends JpaRepository<UserClient, Long> {

	boolean findByEmail(Object object);

	UserClient findByUsername(String username);

	void deleteByUsername(String username);
	
}
