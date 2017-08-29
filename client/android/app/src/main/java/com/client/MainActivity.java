package com.client;

import android.content.Intent;
import android.graphics.Color;
import android.view.Gravity;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.facebook.react.ReactActivity;
import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

    @Override
    public LinearLayout createSplashLayout() {
        LinearLayout layout = new LinearLayout(this);

        layout.setBackgroundColor(Color.parseColor("#f1f3ce"));
        layout.setGravity(Gravity.CENTER);



        return layout;
    }
}
