package com.client.client;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;

/**
 * Created by jinhyuk on 2017. 7. 27..
 */

public class HttpClient {
    private static HttpClient instance;
    private static Context context;
    private RequestQueue requestQueue;

    private HttpClient(Context context) {
        this.context = context;
        this.requestQueue = getRequestQueue();
    }

    public static synchronized HttpClient createInstance(Context context) {
        if (instance == null) {
            instance = new HttpClient(context);
        }

        return instance;
    }

    public static synchronized HttpClient getInstance() {
        return instance;
    }

    public RequestQueue getRequestQueue() {
        if (requestQueue == null) {
            requestQueue = Volley.newRequestQueue(context.getApplicationContext());
        }

        return requestQueue;
    }

    public <T> void addToRequestQueue(Request<T> request) {
        getRequestQueue().add(request);
    }
}
