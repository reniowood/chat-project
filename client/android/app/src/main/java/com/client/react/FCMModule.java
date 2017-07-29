package com.client.react;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.firebase.iid.FirebaseInstanceId;

/**
 * Created by jinhyuk on 2017. 7. 28..
 */

public class FCMModule extends ReactContextBaseJavaModule {
    public FCMModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FCMService";
    }

    @ReactMethod
    public void getFCMToken(Callback callback) {
        callback.invoke(FirebaseInstanceId.getInstance().getToken());
    }
}
