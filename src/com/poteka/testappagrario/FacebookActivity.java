package com.poteka.testappagrario;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.Signature;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.*;
import com.facebook.Session.OpenRequest;
import com.facebook.Session.StatusCallback;
import com.facebook.model.*;
import com.facebook.widget.FacebookDialog;
import com.facebook.widget.WebDialog;
import com.facebook.widget.WebDialog.OnCompleteListener;

import com.facebook.Session;
import com.poteka.testappagrario.util.SystemUiHider;

/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 * 
 * @see SystemUiHider
 */
public class FacebookActivity extends Activity {

	private UiLifecycleHelper uiHelper;
	private boolean flag = false;
	private String strMensajeCompartir;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		uiHelper = new UiLifecycleHelper(this, null);
	    uiHelper.onCreate(savedInstanceState);

		requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, 
                                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        
		setContentView(R.layout.activity_facebook);
		Bundle extras = getIntent().getExtras();
		strMensajeCompartir = extras.getString("MODULO_TERMINADO");
		Session session = Session.getActiveSession();
		Session session2 = Session.openActiveSessionFromCache(this);
		
		if(!session.isOpened() && !session.isClosed() && session2 != null)
		{
			publishFeedDialog(extras.getString("MODULO_TERMINADO"));
		}
		
		else
		{
			LoginFacebook();
		}
		
    }
	
	private boolean appInstalledOrNot(String uri)
    {
        PackageManager pm = getPackageManager();
        boolean app_installed = false;
        try
        {
               pm.getPackageInfo(uri, PackageManager.GET_ACTIVITIES);
               app_installed = true;
        }
        catch (PackageManager.NameNotFoundException e)
        {
               app_installed = false;
        }
        return app_installed ;
    }
	
	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
	    super.onActivityResult(requestCode, resultCode, data);
	    uiHelper.onActivityResult(requestCode, resultCode, data, new FacebookDialog.Callback() {
	        @Override
	        public void onError(FacebookDialog.PendingCall pendingCall, Exception error, Bundle data) {
	            Log.e("Activity", String.format("Error: %s", error.toString()));
	        }

	        @Override
	        public void onComplete(FacebookDialog.PendingCall pendingCall, Bundle data) {
	            Log.i("Activity", "Success!");
	        }
	    });
	    
	    if(flag)
        	publishFeedDialog(strMensajeCompartir);
	}
	
	private void publishFeedDialog(String strModuloSuperado) 
	{
		if(!Session.getActiveSession().getState().isOpened())
		{
			Session.openActiveSessionFromCache(this);
		}
		
	    Bundle params = new Bundle();
	    params.putString("name", "CampoAPPrende - Educación Financiera");
	    params.putString("caption", strModuloSuperado);
	    params.putString("description", "En CampoAPPrende podrás conocer muchos temas relacionados con Educación Financiera. Descárgala Ya!!");
	    params.putString("link", "https://www.facebook.com/campoapprende" + "");
	    params.putString("picture", "http://mssql-2014.cloudapp.net:1927/images/Products/Lenceria/compartir_facebook.jpg");

	    WebDialog feedDialog = (
	        new WebDialog.FeedDialogBuilder(this,
	        		Session.getActiveSession(),
	            params))
	        .setOnCompleteListener(new OnCompleteListener() {
				@Override
				public void onComplete(Bundle values, FacebookException error) {
					if (error == null) {
	                    // When the story is posted, echo the success
	                    // and the post Id.
	                    final String postId = values.getString("post_id");
	                    if (postId != null) {
	                        Toast.makeText(getApplicationContext(),
	                            "Contenido publicado satisfactoriamente.",
	                            Toast.LENGTH_SHORT).show();
	                        	finish();
	                    } else {
	                        // User clicked the Cancel button
	                        Toast.makeText(getApplicationContext(), 
	                            "Publicación cancelada", 
	                            Toast.LENGTH_SHORT).show();
	                        	finish();
	                    }
	                } else if (error instanceof FacebookOperationCanceledException) {
	                    // User clicked the "x" button
	                    Toast.makeText(getApplicationContext(), 
	                        "Publicación cancelada", 
	                        Toast.LENGTH_SHORT).show();
	                    finish();
	                } else {
	                    // Generic, ex: network error
	                    Toast.makeText(getApplicationContext(), 
	                        "Se ha presentado un error al compartir el contenido. Por favor inténtalo más tarde.", 
	                        Toast.LENGTH_SHORT).show();
	                    	finish();
	                }
				}
	        })
	        .build();
	    feedDialog.show();
	}

	private void LoginFacebook()
	{
		try 
    	{
            PackageInfo info = getPackageManager().getPackageInfo("com.poteka.testappagrario",PackageManager.GET_SIGNATURES);
            
            for (Signature signature : info.signatures) 
            {
                MessageDigest md = MessageDigest.getInstance("SHA");
                md.update(signature.toByteArray());
                Log.d("KeyHash:", Base64.encodeToString(md.digest(), Base64.DEFAULT));
            }
        } 
    	catch (NameNotFoundException e) 
    	{

        } 
    	catch (NoSuchAlgorithmException e) 
    	{
    	
    	}
    	
		boolean installed = appInstalledOrNot("com.facebook.katana");
        if(installed)
        {
        	/*
        	// start Facebook Login
	        Session.openActiveSession(this, true, new Session.StatusCallback() 
	        {

	          // callback when session changes state
	          @Override
	          public void call(Session session, SessionState state, Exception exception) 
	          {
	        	  
	        	  if (session.isOpened()) {
	        		// make request to the /me API
	        		  Request.newMeRequest(session, new Request.GraphUserCallback() {

	        		    // callback after Graph API response with user object
	        		    @Override
	        		    public void onCompleted(GraphUser user, Response response) {
	        		    	if (user != null) {
	        		    		Toast.makeText(getApplicationContext(), "Bienvenido a CampoAPPrende, " + user.getName(), Toast.LENGTH_LONG).show();
	        		    	}	
	        		    }
	        		  }).executeAndWait();
	        		}

	          }
	         
	        });
	        */
        	
        	openActiveSession(this, true, Arrays.asList(""), new Session.StatusCallback() {

				@Override
				public void call(Session session, SessionState state,
						Exception exception) {
					flag = true;
				}
        		
        	});
        	
        }
        else
        {
        	Toast.makeText(getApplicationContext(), "No hemos encontrado la aplicación de Facebook. Por favor, instálala e intenta de nuevo.", Toast.LENGTH_LONG).show();
        	finish();
        }
	}
	
	private static Session openActiveSession(Activity activity, boolean allowLoginUI, List<String> permissions, StatusCallback callback) 
	{ 
	    OpenRequest openRequest = new OpenRequest(activity).setPermissions(permissions).setCallback(callback);
	    Session session = new Session.Builder(activity).build();
	    
	    if (SessionState.CREATED_TOKEN_LOADED.equals(session.getState()) || allowLoginUI) 
	    {
	        Session.setActiveSession(session);
	        session.openForRead(openRequest);
	        return session;
	    }
	    return null;
	}
	
	
}
