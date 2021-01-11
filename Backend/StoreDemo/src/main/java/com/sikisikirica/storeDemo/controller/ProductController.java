package com.sikisikirica.storeDemo.controller;

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

import com.sikisikirica.storeDemo.entity.Product;
import com.sikisikirica.storeDemo.repository.ProductRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/product")
public class ProductController {
	
	@Autowired
	private ProductRepository productRepository;
	
	@GetMapping("/productList")
	public ResponseEntity<List<Product>> allProducts(){
		List<Product> pl = productRepository.findAll();	
		return new ResponseEntity<List<Product>>(pl, HttpStatus.OK);
	}
	
	@PostMapping("/newProduct")
	public ResponseEntity<Product> createNewProduct(@RequestBody Product product){
		System.out.println("hello");
		productRepository.save(product);
		return new ResponseEntity<Product>(product, HttpStatus.OK);
	}
	@PostMapping("/deleteProduct")
	public HttpStatus deleteProduct(@RequestBody Product product){
		productRepository.delete(product);
		return HttpStatus.OK;
	}
}

