package com.example.covid_19_noti_app;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.SystemClock;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.content.Context.ALARM_SERVICE;

public class BroadcastD extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {

        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

        testAlarm(context,pendingIntent,intent);
        //알림 내용 설정후 푸쉬
        try {
            createPost(context,pendingIntent);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private void createPost(final Context context, final PendingIntent pendingIntent) throws IOException {
        String region = null;
        String infect = null;
        int total_num=0;
        final ArrayList<String> region_arr=new ArrayList<>();
        ArrayList<String> infect_arr=new ArrayList<>();
        Gson gson = new GsonBuilder()
                .setLenient()
                .create();
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://172.30.1.72:3000/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        RetrofitService retrofitService=retrofit.create(RetrofitService.class);
        Call<JsonArray> call = retrofitService.getretrofitquery(region,infect);
        call.enqueue(new Callback<JsonArray>() {
            @Override
            public void onResponse(Call<JsonArray> call, Response<JsonArray> response) {
                if (response.isSuccessful()) {
                    int total_num=0;
                    JsonArray jsonArray=response.body();
                    for(int i=0;i<jsonArray.size();i++) {
                        JsonElement jsonElement1 = jsonArray.get(i);
                        total_num += jsonElement1.getAsJsonObject().get("new_infected").getAsInt();

                    }

                    NotificationManager notificationmanager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        notificationmanager.createNotificationChannel(new NotificationChannel("default", "기본 채널", NotificationManager.IMPORTANCE_DEFAULT));
                    }
                    NotificationCompat.Builder builder = new NotificationCompat.Builder(context,"default");
                    builder.setSmallIcon(R.mipmap.ic_launcher)
                            .setContentTitle("코로나 알림")
                            .setContentText("어제의 국내 코로나 환자 : " + total_num)
                            .setDefaults(Notification.DEFAULT_SOUND | Notification.DEFAULT_VIBRATE).setContentIntent(pendingIntent).setAutoCancel(true);

                    notificationmanager.notify(1, builder.build());
                }
            }

            @Override
            public void onFailure(Call<JsonArray> call, Throwable t) {
            }
        });

    }
    //다음날 아침 11시에 알림주기
    public void testAlarm(Context context, PendingIntent pendingIntent, Intent intent){
        PendingIntent sender = PendingIntent.getBroadcast(context.getApplicationContext(), 0, intent, 0);
        AlarmManager am = (AlarmManager)context.getSystemService(ALARM_SERVICE);
        Calendar calendar = Calendar.getInstance();
        //알람시간 calendar에 set해주기
        calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DATE)+1,11,
                00, 00);
        if(Build.VERSION.SDK_INT < Build.VERSION_CODES.M){
            if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                //API 19 이상 API 23미만
                am.setExact(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), pendingIntent) ;
            } else {
                //API 19미만
                am.set(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), pendingIntent);
            }
        } else {
            //API 23 이상
            am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), pendingIntent);
        }
    }
}
