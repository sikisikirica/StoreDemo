package com.sikisikirica.storeDemo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.aop.AopInvocationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sikisikirica.storeDemo.entity.Customer;
import com.sikisikirica.storeDemo.entity.Order;
import com.sikisikirica.storeDemo.repository.CustomerRepository;
import com.sikisikirica.storeDemo.repository.OrderRepository;



@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "*")
public class CustomerController {
	
	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private OrderRepository orderRepository;
	
	
	@GetMapping("/customerList")
	public ResponseEntity<List<Customer>> customerList(){
		List<Customer> cl = customerRepository.findAll();	
		return new ResponseEntity<List<Customer>>(cl, HttpStatus.OK);
	}
	@GetMapping("/customerListNew")
	public ResponseEntity<List<Customer>> customerListNew(){
		List<Order> ol = orderRepository.findNew();	
		List<Customer> customers = new ArrayList<>();
		for(int i=0; i<ol.size(); i++) {
			if(!customers.contains(ol.get(i).getCustomer())) {
				customers.add(ol.get(i).getCustomer());
			}
		}
		return new ResponseEntity<List<Customer>>(customers, HttpStatus.OK);
	}
	
	@PostMapping("/newCustomer")
	public ResponseEntity<Customer> createNewCustomer(@RequestBody Customer customer){		
			
		try {
			customer.setId(customerRepository.findIdByEmail(customer.getEmail()));
			return new ResponseEntity<Customer>(customer, HttpStatus.OK);			
		}catch(AopInvocationException e) {
			System.out.println("new customer");
			customerRepository.save(customer);
		return new ResponseEntity<Customer>(customer, HttpStatus.OK);
		}
	}
	
	@PostMapping("/deleteCustomer")
	public HttpStatus deleteCustomer(@RequestBody Customer customer){
		customerRepository.delete(customer);
		return HttpStatus.OK;
	}
	
	@PostMapping("/customerOrders")
	public  ResponseEntity<List<Order>> customerOrders(@RequestBody Customer customer){
		List<Order> ol = customerRepository.findById(customer.getId()).get().getOrders();
		return new ResponseEntity<List<Order>>(ol, HttpStatus.OK);
	}
}
