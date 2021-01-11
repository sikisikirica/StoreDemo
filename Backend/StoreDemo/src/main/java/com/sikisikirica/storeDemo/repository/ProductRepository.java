package com.sikisikirica.storeDemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sikisikirica.storeDemo.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{

}
