self.onmessage = function(e) {
	
    var data = e.data;
    if(typeof data == "string"){
    	data = JSON.parse(data);
    }
    //expected data: {style: {style definitions}, data: data to parse}
    var style = data.style;
    for(var styleName in style){
    	JSONViewer.STYLE[styleName] = style[styleName]; 
    }
    
    var parser = new JSONViewer(data.data);
    if(parser.latestError!=null){
        self.postMessage(parser.latestError);
        return;
    }
    
    var result = parser.getHTML();
    parser = null;
    self.postMessage(result);
};

function JSONViewer(data){
	this.linkRegExp = /([^"\s&;<>]*:\/\/[^"\s<>]*)(&quot;|&lt;|&gt;)?/gim;
    this.jsonValue = null;
    this.latestError = null;
    this.elementsCounter = 0;
    if(typeof data == "string"){
        try {
            this.jsonValue = JSON.parse(data);
        } catch (e) {
            this.latestError = e.message;
        }
    } else {
        this.jsonValue = data;
    }
}

JSONViewer.STYLE = {
	prettyPrint: "prettyPrint",
	numeric: "numeric",
	nullValue: "nullValue",
	booleanValue: "booleanValue",
	punctuation: "punctuation",
	stringValue: "stringValue",
	node: "node",
	arrayCounter: "arrayCounter",
	keyName: "keyName",
	rootElementToggleButton: "rootElementToggleButton",
	infoRow: "infoRow",
	brace: "brace",
	leftMargin: 25,
	arrayKeyNumber: "JSON_parser_arrayKeyNumber"
};

JSONViewer.prototype = {
    getHTML: function(){
    	var parsedData = '<div class="'+JSONViewer.STYLE.prettyPrint+'">';
        parsedData += this.parse(this.jsonValue);
        parsedData += "</div>";
        
        var replace = '<a title="Click to insert into URL field" response-anchor href="$1">$1</a>';
        var match = parsedData.match(this.linkRegExp);
        replace = replace.replace(/\$0/, match)
        parsedData = parsedData.replace(this.linkRegExp,replace);
        
        return parsedData;
    },
    /**
     * Parse JSON data
     */
    parse: function(data){
    	
		var result = "";
		if(data == null){
			result += this.parseNullValue();
		} else if(typeof data == "number"){
			result += this.parseNumericValue(data);
		} else if(typeof data == "boolean"){
			result += this.parseBooleanValue(data);
		} else if(typeof data == "string"){
			result += this.parseStringValue(data);
		} else if(data instanceof Array){
			result += this.parseArray(data);
		} else {
			result += this.parseObject(data);
		}
		
		return result;
    },
    
    parseNullValue: function(){
    	var result = "";
		result += '<span class="'+JSONViewer.STYLE.nullValue+'">';
		result += "null";
		result += '</span>';
		return result;
    },
    
    parseNumericValue: function(number) {
    	var result = "";
		result += '<span class="'+JSONViewer.STYLE.numeric+'">';
		result += number+"";
		result += '</span>';
		return result;
	},
    
    parseBooleanValue: function(bool) {
    	var result = "";
		result += '<span class="'+JSONViewer.STYLE.booleanValue+'">';
		if(bool != null)
			result += bool+"";
		else 
			result += "null";
		result += "</span>";
		return result;
	},
	
	parseStringValue: function(str) {
		var result = "";
		var value = str || "";
		if(value != null){
			value = SafeHtmlUtils.htmlEscape(value);
			if(value.slice(0,1) === "/"){
				value = '<a title="Click to insert into URL field" response-anchor add-root-url href="'+value+'">'+value+'</a>';
			}
		} else {
			value = "null";
		}
		result += '<span class="'+JSONViewer.STYLE.punctuation+'">&quot;</span>';
		result += '<span class="'+JSONViewer.STYLE.stringValue+'">';
		result += value;
		result += '</span>';
		result += '<span class="'+JSONViewer.STYLE.punctuation+'">&quot;</span>';
		return result;
	},
	
	parseObject: function(object) {
		
		var pairs = [];
		for(var key in object){
			if(!object.hasOwnProperty(key)) continue;
			pairs[pairs.length] = key;
			pairs[pairs.length] = object[key];
		}
		var cnt = pairs.length;
		
		
		var result = "";
		result += '<div class="'+JSONViewer.STYLE.punctuation + " " + JSONViewer.STYLE.brace + '">{</div>';
		result += '<div collapse-indicator class="'+JSONViewer.STYLE.infoRow+'">...</div>';
		
//		result += '<div class="' + JSONViewer.STYLE.punctuation + " " + JSONViewer.STYLE.brace + '">'+cnt+'}</div>';
		
		for(var i=0; i<cnt; i=i+2){
			var key = pairs[i];
			var value = pairs[i+1];
			var elementNo = this.elementsCounter++;
			var data = this.parse(value);
			var hasManyChildren = this.elementsCounter - elementNo > 1;
			
			result += '<div data-element="'+elementNo+'" style="margin-left: '+JSONViewer.STYLE.leftMargin+'px" class="'+JSONViewer.STYLE.node+'">';
			result += this.parseKey(key) + ": " + data;
//			if(i+2 != cnt){
//				result += '<span class="'+JSONViewer.STYLE.punctuation+'">,</span>';
//			}
			if(hasManyChildren){
				result += '<div data-toggle="'+elementNo+'" class="'+JSONViewer.STYLE.rootElementToggleButton+'">-</div>';
			}
			result += "</div>";
		}
		
		result += '<div class="' + JSONViewer.STYLE.punctuation + " " + JSONViewer.STYLE.brace + '">}</div>';
		return result;
	},
	
	parseArray: function(array) {
		var cnt = array.length;
		var result = "";
		result += '<div class="'+JSONViewer.STYLE.punctuation + " " + JSONViewer.STYLE.brace + '">[</div>';
		result += '<div collapse-indicator class="'+JSONViewer.STYLE.infoRow+'">...</div>';
		result += '<span class="'+JSONViewer.STYLE.arrayCounter+'">'+cnt+'</span>';
		result += "<span class=\""+JSONViewer.STYLE.punctuation +  " " + JSONViewer.STYLE.brace + "\">]</span>";
		
		for(var i = 0; i<cnt; i++){
			var elementNo = this.elementsCounter++;
			var data = this.parse(array[i]);
			var hasManyChildren = this.elementsCounter - elementNo > 1;
			
			result += '<div data-element="'+elementNo+'" style="margin-left: '+JSONViewer.STYLE.leftMargin+'px" class="'+JSONViewer.STYLE.node+'">';
			result += '<span class="'+JSONViewer.STYLE.arrayKeyNumber+'">'+i+': &nbsp;</span>';
			result += data;
//			if(i<cnt-1){
//				result += '<span class="'+JSONViewer.STYLE.punctuation+'">,</span>';
//			}
			if(hasManyChildren){
				result += '<div data-toggle="'+elementNo+'" class="'+JSONViewer.STYLE.rootElementToggleButton+'">-</div>';
			}
			result += "</div>";
		}
		
		
		return result;
	},
	
	parseKey: function(key){
		var result = "";
		//result += '<span class="'+JSONViewer.STYLE.punctuation+'">&quot;</span>';
		result += '<span class="'+JSONViewer.STYLE.keyName+'">'+key+'</span>';
		//result += '<span class="'+JSONViewer.STYLE.punctuation+'">&quot;</span>';
		return result;
	}
}

var SafeHtmlUtils = {
		AMP_RE: new RegExp(/&/g),
		GT_RE: new RegExp(/>/g),
		LT_RE: new RegExp(/</g),
		SQUOT_RE: new RegExp(/'/g),
		QUOT_RE: new RegExp(/"/g),

		htmlEscape: function(s){
			if (s.indexOf("&") != -1) {
		      s = s.replace(SafeHtmlUtils.AMP_RE, '&amp;')
		    }
		    if (s.indexOf("<") != -1) {
		    	s = s.replace(SafeHtmlUtils.LT_RE, '&lt;')
		    }
		    if (s.indexOf(">") != -1) {
		    	s = s.replace(SafeHtmlUtils.GT_RE, '&gt;')
		    }
		    if (s.indexOf("\"") != -1) {
		    	s = s.replace(SafeHtmlUtils.QUOT_RE, '&quot;')
		    }
		    if (s.indexOf("'") != -1) {
		    	s = s.replace(SafeHtmlUtils.SQUOT_RE, '&#39;')
		    }
		    return s;
		}	
}