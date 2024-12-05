package com.ck.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ck.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	//code written below for search product form data
	@Query("SELECT product FROM Product product WHERE CONCAT(product.id,' ',product.productName,' ',product.price) LIKE %?1%")
	public List<Product> search(String keyword);

	public Product findByproductName(String productName);

}
