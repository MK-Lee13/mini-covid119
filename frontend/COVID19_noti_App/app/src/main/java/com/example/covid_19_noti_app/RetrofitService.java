package com.example.covid_19_noti_app;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface RetrofitService {
    @GET("api/covid119/get/{post}")
    Call<PostResult> getPosts(@Path("post") String post);
}
