package com.example.covid_19_noti_app;

import com.google.gson.annotations.SerializedName;

public class PostResult {

    // @SerializedName으로 일치시켜 주지않을 경우엔 클래스 변수명이 일치해야함

    @SerializedName("region")
    private String region;

    @SerializedName("new_infected")
    private String new_infected;


    // toString()을 Override 해주지 않으면 객체 주소값을 출력함
    @Override
    public String toString() {
        return region + "추가 발생자 : " + new_infected;
    }

}