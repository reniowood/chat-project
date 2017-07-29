package com.client.fcm;

import android.util.Log;

import com.client.models.User;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;

import io.realm.Realm;
import io.realm.RealmResults;
import io.realm.Sort;

/**
 * Created by jinhyuk on 2017. 7. 27..
 */

public class MyFirebaseInstanceIdService extends FirebaseInstanceIdService {
    @Override
    public void onTokenRefresh() {
        // Get updated InstanceID token.
        String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        // du4YU3DUTIQ:APA91bERcWXIXBwWDjtRfgiA_wGZQY_0EG_gqNsmeMpqinMysEZ74pbLIl6wpJ2uysI-zSnHFWIAA200UoQyoipfOopbvTy8D2UStLo59JbMEz6Z6KPKaDgc4Afgk_IPTVSrNxWkxmgI
        Log.d("FCM", "Refreshed token: " + refreshedToken);

        sendRegistrationToServer(refreshedToken);
    }

    private void sendRegistrationToServer(String refreshedToken) {
        // Send token to msg-server
        User userLoggedIn = User.getUserLoggedIn();
        if (userLoggedIn != null) {
            userLoggedIn.updateFCMToken(refreshedToken);
        }
    }
}
