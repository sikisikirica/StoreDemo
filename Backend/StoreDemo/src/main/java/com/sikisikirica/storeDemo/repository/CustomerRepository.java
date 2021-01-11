package com.sikisikirica.storeDemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.sikisikirica.storeDemo.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer>{
	
	@Query("SELECT c.id FROM Customer c where c.email = :email") 
    int findIdByEmail(@Param("email") String email);
	
	
}
