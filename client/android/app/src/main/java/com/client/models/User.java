package com.client.models;

import android.util.Log;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.client.client.HttpClient;
import com.client.constants.Constants;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Date;
import java.util.Map;

import io.realm.Realm;
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

/**
 * Created by jinhyuk on 2017. 7. 27..
 */

public class User extends RealmObject {
    @PrimaryKey
    private String email;
    private String authToken;
    private Date lastLoggedIn;
    private boolean isLoggedIn;

    public String getEmail() {
        return email;
    }

    public String getAuthToken() {
        return authToken;
    }

    public Date getLastLoggedIn() {
        return lastLoggedIn;
    }

    public boolean isLoggedIn() {
        return isLoggedIn;
    }

    public static User getUserLoggedIn() {
        Realm realm = Realm.getDefaultInstance();

        return realm.where(User.class).equalTo("isLoggedIn", true).findFirst();
    }

    public void updateFCMToken(String token) {
        HttpClient httpClient = HttpClient.getInstance();
        if (httpClient != null) {
            JSONObject requestBody = new JSONObject();
            try {
                requestBody.put("fcm_token", token);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.PUT, Constants.API_URL, null, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Log.d("User", "updateFCMToken success");
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.d("User", "updateFCMToken failed");
                }
            }) {
                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    Map<String, String> headers = super.getHeaders();

                    headers.put("Authorization", "Token " + getAuthToken());
                    headers.put("Content-Type", "application/json");

                    return headers;
                }
            };

            httpClient.addToRequestQueue(jsonObjectRequest);
        } else {
            Log.d("User", "httpClient is null");
        }
    }
}
