package com.pruebas.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pruebas.model.UserBar;

@Repository
public interface UserBarDAO extends JpaRepository<UserBar, Long> {

	UserBar findByUsername(String username);
	UserBar findByRut(String rut);
	
	@Query(value = "SELECT * FROM user_bar", nativeQuery = true)
	List<UserBar> findAllBars();
	
}
