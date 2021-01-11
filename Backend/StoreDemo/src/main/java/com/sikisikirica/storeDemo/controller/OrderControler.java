package com.sikisikirica.storeDemo.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sikisikirica.storeDemo.entity.Order;
import com.sikisikirica.storeDemo.repository.OrderRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/order")
public class OrderControler {

	@Autowired
	OrderRepository orderRepository;

	@PostMapping("/newOrder")
	public ResponseEntity<Order> createNewOrder(@RequestBody Order order) {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter nowFormater = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
		order.setDateTime(now.format(nowFormater));
		orderRepository.save(order);
		return new ResponseEntity<Order>(order, HttpStatus.OK);
	}

	@PostMapping("/acceptOrder")
	public ResponseEntity<Order> acceptOrder(@RequestBody Order order) {
		Order o = orderRepository.findById(order.getId()).get();
		o.setAccepted(true);
		orderRepository.save(o);
		return new ResponseEntity<Order>(order, HttpStatus.OK);
	}

	@GetMapping("/orderList")
	public ResponseEntity<List<Order>> allOrders() {
		List<Order> ol = orderRepository.findAll();
		return new ResponseEntity<List<Order>>(ol, HttpStatus.OK);
	}

}
