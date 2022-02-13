package com.pruebas.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pruebas.model.Item;

@Repository
public interface ItemDAO extends JpaRepository<Item, Long> {
	
	Item findByUri(String uri);	
	
	@Query("SELECT i FROM Item i where i.userBar.id = :id order by i.votes DESC, i.date ASC")
	List<Item> findItemsByBar(@Param("id") Long id);
	
	@Query("SELECT i FROM Item i where i.userBar.id = :id order by i.votes ASC")
	List<Item> findItemsByBarASC(@Param("id") Long id);
}