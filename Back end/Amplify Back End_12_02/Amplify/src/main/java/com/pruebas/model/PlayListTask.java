package com.pruebas.model;

import java.io.IOException;
import java.util.TimerTask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.pruebas.exceptions.AmplifyException;
import com.pruebas.services.BarServices;

@Component
public class PlayListTask extends TimerTask {

	@Autowired
	BarServices services;

	@Scheduled(fixedRate = 20000)
	@Override
	public void run() {
		try {
			services.programmedListReorder();
		} catch (AmplifyException | IOException | InterruptedException e) {
			e.printStackTrace();
		}
	}
}
