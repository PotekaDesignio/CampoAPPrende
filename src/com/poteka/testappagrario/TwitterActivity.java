package com.poteka.testappagrario;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;


/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 * 
 * @see SystemUiHider
 */
public class TwitterActivity extends Activity {
	
    @Override
    public void onCreate(Bundle savedInstanceState) 
    {
        super.onCreate(savedInstanceState);
        
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, 
                                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        
        setContentView(R.layout.activity_twitter);
        initTwitter();
        
    }
    
    public void initTwitter()
    {
    	Bundle extras = getIntent().getExtras();
    	String value = extras.getString("MENSAJE_COMPARTIR");
    	
    	Intent shareIntent = new Intent();
    	
    	shareIntent.setAction(Intent.ACTION_SEND);
    	shareIntent.setType("text/plain");
    	shareIntent.putExtra(Intent.EXTRA_TEXT, value);
    	startActivity(Intent.createChooser(shareIntent, "CampoAPPrende"));
    	finish();
    	
    }
    
}
