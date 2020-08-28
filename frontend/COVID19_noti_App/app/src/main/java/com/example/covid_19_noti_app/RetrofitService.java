package com.example.covid_19_noti_app;

import com.google.gson.JsonArray;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface RetrofitService {
    @GET("/api/covid119/get")
    Call<JsonArray> getretrofitquery(@Query("region") String region,@Query("new_infected") String infect);

}
