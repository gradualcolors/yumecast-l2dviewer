window.URL = window.URL || window.webkitURL;
let page = 0;
let mainDiv = document.getElementById('capture');
let charName1 = null;
let charName2 = null;
let sm = $("#function > #g1 > p > select.motion");
let sm2 = $("#function2 > #g2 > p > select.motion");
let se = $("#function > #g1 > p >select.exp");
let se2 = $("#function2 > #g2 > p > select.exp");
let charJson1 = {}
let charJson2 = {}
let webDir = window.location.protocol + window.location.hostname + "/" ;
var timeStamp;
let currentBlobBG = null;


const downloadBlob = function(index) {
    return function(blob) {
        const a = document.createElement("a");
		screenshotName = charName1;
		if(charName2 != null)
		{screenshotName += "_" + charName2;}
		a.download = screenshotName + "_" + index;
        a.href = window.URL.createObjectURL(blob);
		a.target='_blank';
        a.click();
		setTimeout(function(){
        window.URL.revokeObjectURL(a.href);}, 1000);
    }
}
function save(index) { renderer.view.toBlob(downloadBlob(index)); }
function capture() { save(page++); }

function get(url, callback) {
    $.getJSON({
        url: url,
        success: function(data) {callback(data)},
        error: function(xhr) {alert(xhr.responseJSON)}
    })
}

function getImage() {
$("button#capture_div").attr("disabled", true);
$("#log").append("<li>Processing window screenshot...</li>");
  domtoimage.toBlob(mainDiv)
    .then(function(blob) 
	{timeStamp = Math.round(+new Date()/1000);
      window.saveAs(blob, 'Screenshot_' + timeStamp + '.png');
	  $("#log").append("<li style=\"color:green;\">Window screenshot captured.</li>");
	  $("button#capture_div").attr("disabled", false);
    },'image/png');
	
	setTimeOut(function(){
        window.URL.revokeObjectURL(blob);}, 1000);
}


$(document).ready(function() {
	
	if (window.innerWidth > 1200)
	{
	init(1200, 676);
	} 
	else if (window.innerWidth > 817)
		
	{
		init(900, 507);
	}
	
	else 
		
	{
		init(768, 432);
	}


	$("select.company").change(function() {
    var input = this;
	var $div = $(input).closest(".charBox");
	
	var sc = $div.find("select.char_select");
	var so = $div.find("select.outfit");
	
	sc.empty();
	so.empty();
	
	sc.val("");
	so.val("");
	var company = $(input).val();
	$div.find("button.first").attr("disabled", false);
	
	if (company == "Yumeiro Company")
	{
		sc.append($("<option></option>").text("Subaru").val("subaru")); 
		sc.append($("<option></option>").text("Sousei").val("sosei")); 
		sc.append($("<option></option>").text("Kyoya").val("kyo"));  
		sc.append($("<option></option>").text("Kaito").val("kaito"));  
		sc.append($("<option></option>").text("Jin").val("jin"));    
		sc.append($("<option></option>").text("Iori").val("iori"));   
		sc.append($("<option></option>").text("Hinata").val("hinata")); 
		
		so.append($("<option></option>").text("Default").val("1")); 
		so.append($("<option></option>").text("Sunshine").val("second")); 
		so.append($("<option></option>").text("Beach").val("third")); 
	}
	
	else if (company == "GENESIS")
	{
		sc.append($("<option></option>").text("Yutaro").val("yutarou")); 
		sc.append($("<option></option>").text("Ryosuke").val("ryosuke")); 
		sc.append($("<option></option>").text("Rei").val("rei"));  
		sc.append($("<option></option>").text("Takuma").val("takuma"));  
		sc.append($("<option></option>").text("Gaku").val("gaku"));    
	
		so.append($("<option></option>").text("Default").val("1")); 
		so.append($("<option></option>").text("Beach").val("second")); 
	}
});	
	
  
		

		
$("button#modela").click( function() {
	


 if($("select.charA").val() == "" || $("select.charA").val() == null)
 {
	 return false;
 }
 
 if($("select.outfitA").val() == "" || $("select.outfitA").val() == null)
 {
	 return false;
 }
charName1 = $("select.charA option:selected").text();
$("span#active_charA").html(charName1);	

            let firstChild = null;
			if(stage.children.length <= 1)
				
			{	
				if(stage.children.length < 1)
				{
					$("button#modela").html("Change Character A");
					$("button.captureB").attr("disabled", false);
				}
			{while (firstChild = stage.children.shift()) { firstChild.destroy(); }}			
			$("#charSpace2").css("pointer-events", "auto");
			}
			else
			{
			
				firstChild = stage.children[0]; firstChild.destroy(); 

			}
			
			var outfit;
			
			switch ($("select.outfitA").val())
			{
				case "1": 
				outfit = "";
				break;
				case "second":
				outfit = "_second";
				break;
				case "third":
				outfit = "_third";
				break;
			}
			
						
			
			var charURL = "/assets/Live2D Textures/" +  $("select.companyA").val() + "/" + $("select.charA").val() + "/" + $("select.charA").val() + outfit + "/";
			
			    show(charURL, "model.json", function(model)
				{
					se.empty();
					for (let c in model.expressions) {
						let i = model.expressions[c];
						se.append($("<option></option>").text(i.name).val(i.name));
					}
					se.val("");

					sm.empty();
					/*for (let c in model.motions.motion) {
						let i = model.motions.motion[c];
						sm.append($("<option></option>").text(i.name).val(c));
					}*/
					
					for (let c in model.motions) {
					for (let d in model.motions[c]) {
						sm.append($("<option></option>").text(c+d).val(d));
					}
					}	
				
				if(stage.children.length > 1)
				{
					let temp = stage.children[0];
					stage.children[0] = stage.children[1];
					stage.children[1] = temp;
					stage.children[0].adjustTranslate(-0.5, 0);
				}
                sm.val("");	
            });

});	

$("button#modelb").click( function() {
		
		
		
 if($("select.charB").val() == "" || $("select.charB").val() == null)
 {
	 return false;
 }
 
 if($("select.outfitB").val() == "" || $("select.outfitB").val() == null)
 {
	 return false;
 }
 
			
		charName2 = $("select.charB option:selected").text();
		$("span#active_charB").html(charName2);
		switch ($("select.outfitB").val())
			{
				case "1": 
				outfit = "";
				break;
				case "second":
				outfit = "_second";
				break;
				case "third":
				outfit = "_third";
				break;
			}
		
			var charURL2 = "/assets/Live2D Textures/" +  $("select.companyB").val() + "/" + $("select.charB").val() + "/" + $("select.charB").val() + outfit + "/";
		
			if(stage.children.length > 1)
			{			
				let secondChild = null;
				secondChild = stage.children[1]; secondChild.destroy();	
			
			
			show(charURL2, "model.json", function(model2) {                                  
					se2.empty();
					for (let c in model2.expressions) {
						let i = model2.expressions[c];
						se2.append($("<option></option>").text(i.name).val(i.name));
					}
					se2.val("");

					sm2.empty();
					/*for (let c in model2.motions.motion) {
						let i = model2.motions.motion[c];
						sm2.append($("<option></option>").text(i.name).val(c));
					}*/
					
				for (let c in model2.motions) {
					for (let d in model2.motions[c]) {
						sm2.append($("<option></option>").text(c+d).val(d));
					}
				}
                sm2.val("");
				
				
				
				stage.children[1].adjustTranslate(0.5, 0);
				$("button#modelb").html("Change Character B");
				$("button#removeb").show();
			});

			}
			else{
			

			show(charURL2, "model.json", function(model2) {                                  
					se2.empty();
					for (let c in model2.expressions) {
						let i = model2.expressions[c];
						se2.append($("<option></option>").text(i.name).val(i.name));
					}
					se2.val("");

					sm2.empty();
					/*for (let c in model2.motions.motion) {
						let i = model2.motions.motion[c];
						sm2.append($("<option></option>").text(i.name).val(c));
					}*/
					
				for (let c in model2.motions) {
					for (let d in model2.motions[c]) {
						sm2.append($("<option></option>").text(c+d).val(d));
					}
				}
                sm2.val("");
				
				stage.children[0].adjustTranslate(-0.5, 0);
				stage.children[1].adjustTranslate(0.5, 0);
				$("button#modelb").html("Change Character B");
				$("button#removeb").show();

			});
			}
				
			});	
	
		$("button#removeb").click( function() {
		
			let lastChild = null;
			lastChild = stage.children[1]; lastChild.destroy();
			stage.children[0].adjustTranslate(0.5, 0);                     
                sm2.empty();
                sm2.val("");
				$("button#removeb").hide();
				$("button#modelb").html("Add Character B");


});	
	var motion; 
	var motion2; 
	
	  sm.change(function() { 
	  motion = $("option:selected", this).text().replace(/[0-9]/g, '');
	  stage.children[0].model.startMotion(motion, this.value) 
	  });
	  sm2.change(function() { 
	  motion2 = $("option:selected", this).text().replace(/[0-9]/g, '');
	  stage.children[1].model.startMotion(motion2, this.value) 
	  });
	
      //  sm.change(function() { stage.children[0].model.startMotion("motion", this.value) });
	//	sm2.change(function() { stage.children[1].model.startMotion("motion", this.value) });
        $("#function > #g1 > p > button.motion").click(function(){ sm.change() });
		$("#function2 > #g2 > p >  button.motion").click(function(){ sm2.change() });	
	
	
		se.change(function() {
            if (!this.value) return;
            stage.children[0].model.setExpression(this.value);
        });
	
		se2.change(function() {
            if (!this.value) return;
            stage.children[1].model.setExpression(this.value);
        });
	
	
	
/*	    $('#close_charBox1').click(function(){
    	var hidden = $('#charSpace1');
        hidden.fadeOut(150);		
		$('#show_charBox1').show();
		
    });*/
    
    $('#show_charBox1').click(function(){
    	var hidden = $('#charSpace1');
		$('#show_charBox1').hide();
		hidden.delay(150).fadeIn(150);	
    });

/*	    $('#close_charBox2').click(function(){
    	var hidden = $('#charSpace2');
        hidden.fadeOut(150);		
		$('#show_charBox2').show();
		
    });*/
    
    $('#show_charBox2').click(function(){
    	var hidden = $('#charSpace2');
		$('#show_charBox2').hide();
		hidden.delay(150).fadeIn(150);		
    });

	  


$('#hide_ui').click(function(){
		$('#ui').toggle();			
    });
	
	
});

$('#changeBG').click(function() {
    document.getElementById('file-input').click();

});


function readURL(input) {
		let file = input.files[0];
		window.URL.revokeObjectURL(currentBlobBG);
		if (file != null) {
			currentBlobBG = window.URL.createObjectURL(file);
			
		$('#main').attr('style', 'background-image:url(' + currentBlobBG + ')');
		}
		else
		{window.URL.revokeObjectURL(currentBlobBG);
		$('#main').attr('style', 'background-image:url("assets/image/drama_bg_01.jpg")');
	}
}



