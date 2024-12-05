package com.ck.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.ck.model.Product;

public interface ProductService {
	Product saveProduct(Product product);

	Product getProductById(Long id);

	void deleteProductByid(long id);
	List<Product> getAllProduct(String keyword);
	//code weitten beloow for pagination
	Page<Product> findPaginated(int pageNo, int pageSize, String sortField,String sortDir );

}
