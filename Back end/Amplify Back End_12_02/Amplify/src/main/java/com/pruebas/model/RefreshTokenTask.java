package com.pruebas.model;

import java.util.TimerTask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.pruebas.services.BarServices;

@Component
public class RefreshTokenTask extends TimerTask {
	
	@Autowired
	BarServices services;

	@Scheduled(fixedRate = 300000)
	@Override
	public void run() {
		try {
			services.programmedRefreshTokens();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
