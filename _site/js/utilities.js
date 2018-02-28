// Extend Storage function to allow for JSON in localstorage
Storage.prototype.setData = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};
Storage.prototype.getData = function (key) {
  return JSON.parse(localStorage.getItem(key));
};

// Extend Array function
Array.prototype.getSum = function(){
  //returns the sum of numbers in an array
  return this.reduce(function add(a, b){
    return a + b;
  }, 0);
};
// Extend Number function
Number.prototype.padWithDigits = function(n) {
  var txt = this.toString();
  while (txt.length < n) {
    txt = '0' + txt;
  }
  return txt;
};
Number.prototype.toRad = function() {
  return this * Math.PI / 180;
};
// Extend Date function
Date.prototype.toShortDateString = function() {
  var tempStr = '';
  var dayOfTheMonth = this.getDate();
  var month = this.getMonth();
  var year = this.getFullYear();
  tempStr += dayOfTheMonth.padWithDigits(2) + '-' + month.padWithDigits(2) + '-' + year.padWithDigits(4);
  return tempStr;
};
var Utils = {
  // Get JSON from localstorage string by his/her namespace
  // Set JSON to localstorage string by his/her namespace
  store: function(namespace, data) {
    if (arguments.length > 1) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    } else {
      var storedData = localStorage.getItem(namespace);
      return (storedData && JSON.parse(storedData)) || null;
    }
  },
  sortAZ: function(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  },
  //remove spaces
  removeSpaces: function(string){
    //define 'é'
    var re = new RegExp(/\u0301|\u00e9/g);
    //remove space
    string = string.replace(/\s/g, '');
    //replace é with e
    string = string.replace(re,'e');
    //remove '
    string = string.replace("'", '');
    return string;
  },
  //capitalize first letter
  capitalizeFirstLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  //get variables from url
  getQueryVariable: function(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  },
  //function calculates distance walked based on previous locations
  getDistanceWalked: function(el, el2){
    var positions = [];
    var distances = [];
    var pos = {};

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setInterval(function(){
          positions.push(pos);
        }, 5000);
        setInterval(function(){
          for(var i = 0; i < positions.length; i+=2){
            distances.push(
              Utils.calculateDistanceBetweenTwoCoordinates(
                positions[i].lat, positions[i].lng,
                positions[i+1].lat, positions[i+1].lng
              )
            );
            var sum = distances.getSum();
            //accelerate process, to show it works from static desktop.
            sum += 500;
            distances = [sum];
            positions = [];
            var distanceWalked = sum.toFixed(0) < 1000 ? sum.toFixed(0) + ' m' : (sum.toFixed(0)/1000) + ' km';
            document.getElementById(el).innerHTML = distanceWalked;
            document.getElementById(el2).innerHTML = (sum.toFixed(0) * 0.05).toFixed(1);
            //multiply distance by 0.5 because walking 1000m burns 50calories (1000/50 = 0.5)
          }
        }, 10001);
      });
    }
  },
  //get cityname from coords with google api
  getCityFromLatLong: function(el) {
    var el = document.getElementById(el);
    var displayLocation = function(latitude, longitude) {
      var request = new XMLHttpRequest();
      var method = 'GET';
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
      var async = true;

      request.open(method, url, async);
      request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
          var data = JSON.parse(request.responseText);
          var address = data.results[0];
          if (el != null) {
            el.innerHTML = address.address_components[2].long_name;
          }
        }
      };
      request.send();
    };

    var successCallback = function(position) {
      var x = position.coords.latitude;
      var y = position.coords.longitude;
      displayLocation(x, y);
    };

    var errorCallback = function(error) {
      var errorMessage = 'Unknown error';
      switch (error.code) {
        case 1:
          errorMessage = 'Unknown';
          break;
        case 2:
          errorMessage = 'Unavailable';
          break;
        case 3:
          errorMessage = 'Timeout';
          break;
      }
      if (el != null) {
        el.innerHTML = errorMessage;
      }
    };

    var options = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
  },
  //returns temperature in Ghent
  getWeather: function(el) {
    var el = document.getElementById(el);

    function WeatherWidget() {
      this.API_URL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D12591774%20AND%20u%3D%22c%22&format=json&diagnostics=true&callback=';
      this.channel;
      this.temp;
      this.loadData = function() {
        var that = this;

        Utils.getJSONPByPromise(this.API_URL).then(
          function(data) {
            that.channel = data.query.results.channel;
            that.updateUI();
          },
          function(error) {
            return error;
          }
        );
      };

      this.updateUI = function() {
        var item = this.channel.item;
        var temperature = item.condition.temp;
        this.temp = temperature;
        el.innerHTML = this.temp + '&deg;C';
      };
    };
    var ww1 = new WeatherWidget();
    ww1.loadData();
  },
  getJSONByPromise: function(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        if (xhr.status == 200) {
          var data = (!xhr.responseType) ? JSON.parse(xhr.response) : xhr.response;
          resolve(data);
        } else {
          reject(status);
        }
      };
      xhr.onerror = function() {
        reject(Error("Network Error"));
      };
      xhr.send();
    });
  },
    getParamsFromUrl: function(url) {
        var regex = /[?&]([^=#]+)=([^&#]*)/g,
            params = {},
            match;
        while(match = regex.exec(url)) {
            params[match[1]] = match[2];
        }
        return params;
    },
  getJSONPByPromise: function(url) {
    url = url + '_' + new Date().getTime() + '_' + Math.round(new Date().getTime() / (Math.random() * 10));
    var script = document.createElement('script');
    script.src = url;

    script.onload = function() {
      this.remove();
    }; // After scripts is loaded and executed, remoe it from the DOM

    var head = document.getElementsByTagName('head')[0];
    head.insertBefore(script, head.firstChild); // Insert script into the DOM

    var params = this.getParamsFromUrl(url);
    var callbackStr = 'json_callback';

    if (params['prefix']) {
      callbackStr = params['prefix'];
    } else if (params['callback']) {
      callbackStr = params['callback'];
    }

    return new Promise(function(resolve, reject) {
      window[callbackStr] = function(data) {
        resolve(data);
      }
    });
  },
  guid: function() {
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
  },
  pluralize: function(count, word) {
    return count === 1 ? word : word + 's';
  },
  trim: function(str) {
    return str.replace(/^\s+|\s+$/gm, '');
  },
  timeToTwitterDateTimeString: function(time) {
    var now = new Date();
    var timediff = (now.getTime() - time) / 1000;
    if (timediff < 60) {
      return Math.floor(timediff) + 's';
    } else if (timediff < 3600) {
      return Math.floor(timediff / 60) + 'm';
    } else if (timediff < 3600 * 24) {
      return Math.floor(timediff / 3600) + 'h';
    } else if (timediff < 3600 * 24 * 7) {
      return Math.floor(timediff / (3600 * 24)) + 'd';
    } else {
      return new Date(time).toLocaleDateString();
    }
  },
  calculateDistanceBetweenTwoCoordinates: function(lat1, lng1, lat2, lng2) {
    var R = 6371; // km
    var lat1 = parseFloat(lat1);
    var lng1 = parseFloat(lng1);
    var lat2 = parseFloat(lat2);
    var lng2 = parseFloat(lng2);

    var dLat = (lat2 - lat1).toRad();
    var dLon = (lng2 - lng1).toRad();
    var lat1 = lat1.toRad();
    var lat2 = lat2.toRad();

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c
    return d; //in km
  },
  getGEOLocationByPromise: function() {
    return new Promise(function(resolve, reject) {
      if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            resolve(position);
          },
          function(error) {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.log("User did not share geolocation data");
                break;
              case error.POSITION_UNAVAILABLE:
                console.log("Could not detect current position");
                break;
              case error.TIMEOUT:
                console.log("Retrieving position timed out");
                break;
              default:
                console.log("Unknown Error");
                break;
            }
            reject(error);
          }, {
            timeout: 10000,
            enableHighAccuracy: true
          }
        )
      } else {
        reject("HTML5 Geolocation not supported!");
      }
    });
  }
}
