package com.example.covid_19_noti_app;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class PostResult {


    // @SerializedName으로 일치시켜 주지않을 경우엔 클래스 변수명이 일치해야함
    List<region> regionList=new ArrayList<>();
    List<new_infected> new_infectedList=new ArrayList<>();
    public List<region> getregion() {return regionList;}
    public List<new_infected> getinfected() {return new_infectedList;}


    class region{
        @SerializedName("region")
        private String region;
        public String getRegion(){ return region;}
    }
    // toString()을 Override 해주지 않으면 객체 주소값을 출력함

    class new_infected{
        @SerializedName("new_infected")
        private String new_infected;
        public String getNew_infected(){return new_infected;}
    }
    // toString()을 Override 해주지 않으면 객체 주소값을 출력함

}