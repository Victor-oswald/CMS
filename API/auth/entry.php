<?php
    $browser_name='';
     $browser_platform='';
    $agent=$_SERVER['HTTP_USER_AGENT'];
    if(preg_match('/windows|win32/i',$agent)){
        $browser_platform='Windows';
    }
    elseif(preg_match('/linux/i',$agent)){
        $browser_platform='Linux';
    }
    elseif(preg_match('/macintosh|mac os x/i',$agent)){
        $browser_platform='Mac';
    }

      #get the Browser platform

    if(preg_match('/MSIE/i',$agent)){
        $browser_name='Internet Explorer/Edge';
    }
    elseif(preg_match('/Edg/i',$agent)){
        $browser_name='Microsoft Edge';
    }
    elseif(preg_match('/Firefox/i',$agent)){
        $browser_name="Firefox";
    }
    elseif(preg_match('/Opr/i',$agent)){
        $browser_name='Opera Mini';
    }
    elseif(preg_match('/Chrome/i',$agent)){
        $browser_name='Google Chrome';
    }
    elseif(preg_match('/Safari/i',$agent)){
        $browser_name="Apple Safari";
    }
    else{
        $browser_name="Unknown";
    }

?>