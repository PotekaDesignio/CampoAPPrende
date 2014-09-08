package com.poteka.testappagrario;

import java.io.File;
import java.lang.annotation.Annotation;
import java.util.List;
import java.util.Locale;

import com.facebook.FacebookException;
import com.facebook.FacebookOperationCanceledException;
import com.facebook.Session;
import com.facebook.UiLifecycleHelper;
import com.facebook.widget.FacebookDialog;
import com.facebook.widget.WebDialog;
import com.facebook.widget.WebDialog.OnCompleteListener;
import com.poteka.testappagrario.util.SystemUiHider;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.app.AlertDialog;

import android.content.ActivityNotFoundException;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Build.VERSION;
import android.os.Bundle;
import android.os.Handler;
import android.preference.PreferenceManager;
import android.speech.tts.TextToSpeech;
import android.support.annotation.DrawableRes;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebSettings.RenderPriority;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;
import android.widget.Toast;

/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 * 
 * @see SystemUiHider
 */
public class Main extends Activity {
	
	private static boolean doubleBackToExitPressedOnce = false;
	final Handler myHandler = new Handler();
	SharedPreferences pref;
	private TextView myTextView;
	TextToSpeech ttobj;
	private String[] strNombreModulo;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, 
                                WindowManager.LayoutParams.FLAG_FULLSCREEN);
		
        setContentView(R.layout.activity_main);
        
        //FacebookDialog shareDialog = new FacebookDialog.ShareDialogBuilder(this).setLink("https://developers.facebook.com/android").build();
        //uiHelper.trackPendingDialogCall(shareDialog.present());
        
        pref = getApplicationContext().getSharedPreferences("bool_AceptaCondiciones", MODE_PRIVATE);
        
        boolean resultado = pref.getBoolean("bool_AceptaCondiciones", false);
        
        if(!resultado)
        {
            try
            {
            	ShowDisclaimer();
            }
            catch(Exception ex)
            {
            	Toast.makeText(this, ex.getMessage(), Toast.LENGTH_LONG).show();
            }
        }
        
        IniciarApp();
	}
	
	@Override
	public void onPause(){
	      if(ttobj !=null){
	         ttobj.stop();
	         ttobj.shutdown();
	      }
	      super.onPause();
	   }	
	
	public class JavaScriptInterface 
	{
		Context mContext;

	    JavaScriptInterface(Context c) 
	    {
	        mContext = c;
	    }
		    
	    @JavascriptInterface 
	    public void showToast(String webMessage)
	    {	    	
	    	final String msgeToast = webMessage;	    	
	    	 myHandler.post(new Runnable() 
	    	 {
	             @Override
	             public void run() {
	                 // This gets executed on the UI thread so it can safely modify Views
	                 myTextView.setText(msgeToast);
	             }
	         });
	    	 
	    	 String[] separated = webMessage.split("_");
	    	 
	    	 if(separated.length > 1)
	    	 {
	    		 String strAccion = separated[0];
	    		 if(strAccion.equals("FACEBOOK"))
	    		 {
	    			 	 openFacebookActivity(separated);
	    		 }
	    		 
	    		 if(strAccion.equals("TWITTER"))
	    		 {
	    			 CompartirTwitter(separated);
	    		 }
	    		 if(strAccion.equals("LINK"))
	    		 {
	    			 Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(separated[1]));
	    			 startActivity(browserIntent);
	    		 }
	    		 
	    	 }
	    	 else
	    	 {
		    	 Toast.makeText(mContext, webMessage, Toast.LENGTH_LONG).show();	    	 
	    	 }
	    }
	    
    }
	 
	public class JavaScriptInterfaceTalk {
			Context mContext;

			JavaScriptInterfaceTalk(Context c) {
		        mContext = c;
		    }
			
			@JavascriptInterface 
		    public void speakText(String webMessage){	    	
		    	final String msgeToast = webMessage;	    	
		    	 myHandler.post(new Runnable() {
		             @Override
		             public void run() {
		                 // This gets executed on the UI thread so it can safely modify Views
		                 myTextView.setText(msgeToast);
		             }
		         });
		    	 Main.this.speakText(mContext, webMessage);
		    }
	    }
	 
	public void speakText(Context mContext, String toSpeak){
	      
	      //Toast.makeText(mContext, toSpeak, 
	      //Toast.LENGTH_SHORT).show();
	      ttobj.speak(toSpeak, TextToSpeech.QUEUE_FLUSH, null);
	   }

	@Override
	protected void onPostCreate(Bundle savedInstanceState) {
		super.onPostCreate(savedInstanceState);

	}
	
	@Override
	public void onBackPressed() {
		
		//WebView myWebView = (WebView) findViewById(R.id.webViewMain);
		//myWebView.loadUrl("javascript:onStepBack();");
		
	    if (doubleBackToExitPressedOnce) {
	        super.onBackPressed();
	        return;
	    }

	    Main.doubleBackToExitPressedOnce = true;
	    Toast.makeText(this, "Para salir presiona ATRÁS nuevamente.", Toast.LENGTH_LONG).show();

	    new Handler().postDelayed(new Runnable() {

	        @Override
	        public void run() {
	            doubleBackToExitPressedOnce=false;                       
	        }
	    }, 3000);
	}
	
	public void ShowDisclaimer()
	{
		AlertDialog dialog = new AlertDialog.Builder(this).setMessage(R.string.disclaimer)
                .setPositiveButton(R.string.aceptar, new OnClickListener() {
                	
                	@SuppressLint("CommitPrefEdits")
					@Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                        Editor editor = pref.edit();
                        editor.putBoolean("bool_AceptaCondiciones", true);
                        editor.commit();
                        
                    }
                }).setNegativeButton(R.string.cancelar, new OnClickListener() {

                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                        TerminarApp();
                    }
                }).create();
		
		dialog.setTitle(R.string.titulo_modal);
		dialog.setCancelable(false);
		
		dialog.show();
	
	}

	private void openFacebookActivity(String[] acciones) 
	{
		if(acciones[1].equals("LOGIN"))
		 {
			Intent myIntent = new Intent(Main.this, FacebookActivity.class);
			myIntent.putExtra("ACCION_FACEBOOK", acciones[1]);
			myIntent.putExtra("MENSAJE_COMPARTIR", acciones[2]);
	        startActivity(myIntent);
	        
	        overridePendingTransition(R.anim.activityfadein, R.anim.splashfadeout);
		 }
		
		else if(acciones[1].equals("FINAL-MODULO"))
		 {
			strNombreModulo = acciones;
			AlertDialog.Builder builder = new AlertDialog.Builder(this);
			builder.setMessage(acciones[3] + "\nDeseas compartir tu progreso?").setPositiveButton("Facebook", dialogClickListener)
															.setIcon(R.drawable.facebook_logo)
															.setNegativeButton("Otras Redes", dialogClickListener)
															.setNeutralButton("Cancelar", dialogClickListener)
															.setCancelable(false).show();
		 }
	}
	
	DialogInterface.OnClickListener dialogClickListener = new DialogInterface.OnClickListener() 
	{
        @Override
        public void onClick(DialogInterface dialog, int which) 
        {
            switch (which)
            {
	            case DialogInterface.BUTTON_POSITIVE:
	                
	            	strNombreModulo[2] = "Acabo de superar el módulo " + strNombreModulo[2];
	            	
	            	Intent myIntent = new Intent(Main.this, FacebookActivity.class);
	    			myIntent.putExtra("ACCION_FACEBOOK", strNombreModulo[1]);
	    			myIntent.putExtra("MODULO_TERMINADO", strNombreModulo[2]);
	    	        startActivity(myIntent);
	    	        
	    	        overridePendingTransition(R.anim.activityfadein, R.anim.splashfadeout);
	                break;
	
	            case DialogInterface.BUTTON_NEGATIVE:
	            	
	            	strNombreModulo[2] = "Acabo de superar el módulo " + strNombreModulo[2] + ". Descarga ya #CampoAPPrende.";
	                CompartirTwitter(strNombreModulo);
	                break;
	                
	            case DialogInterface.BUTTON_NEUTRAL:
	                //Cancelar
	                break;
            }
        }
	};
	
	@SuppressLint("JavascriptInterface")
	public void IniciarApp()
	{
		final JavaScriptInterface  myJavaScriptInterface = new JavaScriptInterface (this);
		final JavaScriptInterfaceTalk  myJavaScriptInterfaceTalk = new JavaScriptInterfaceTalk (this);
		
		ttobj=new TextToSpeech(getApplicationContext(), 
	  	      new TextToSpeech.OnInitListener() 
		{
	  	      @Override
	  	      public void onInit(int status) {
	  	         if(status != TextToSpeech.ERROR){
	  	             ttobj.setLanguage(Locale.getDefault());
	  	            }				
	  	         }
	  	      });
      
      WebView myWebView = (WebView) findViewById(R.id.webViewMain);
      myTextView = (TextView)findViewById(R.id.textView1);   
		
      WebSettings webSettings = myWebView.getSettings();
      webSettings.setJavaScriptEnabled(true);
      webSettings.setDomStorageEnabled(true);
      webSettings.setDatabaseEnabled(true);

    if (VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN_MR2) {
        File databasePath = getDatabasePath("banappgrario_db");
        webSettings.setDatabasePath(databasePath.getPath());
    }
		
		myWebView.getSettings().setUseWideViewPort(true);
		myWebView.getSettings().setSupportZoom(false);
		myWebView.getSettings().setBuiltInZoomControls(true);
		myWebView.setWebViewClient(new WebViewClient());
		myWebView.setScrollbarFadingEnabled(true);
		myWebView.setVerticalScrollBarEnabled(false);
		
		myWebView.getSettings().setJavaScriptEnabled(true);
		myWebView.addJavascriptInterface(myJavaScriptInterface, "AndroidFunctionToast");
		myWebView.addJavascriptInterface(myJavaScriptInterfaceTalk, "AndroidFunctionTalk");
		
		myWebView.loadUrl("file:///android_asset/html/index.html");
	}

	public void TerminarApp()
	{
		finish();
	}

	@Override
	protected void onResume() {
	    super.onResume();
	}

	@Override
	protected void onSaveInstanceState(Bundle outState) {
	    super.onSaveInstanceState(outState);
	}
	
	@Override
	public void onDestroy() {
	    super.onDestroy();
	}

	protected void CompartirTwitter(String[] message)
	{
		Intent myIntent = new Intent(Main.this, TwitterActivity.class);
		myIntent.putExtra("MENSAJE_COMPARTIR", message[2]);
        startActivity(myIntent);
        
        overridePendingTransition(R.anim.activityfadein, R.anim.splashfadeout);
	}
}
