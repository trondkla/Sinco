
$(function() {

    // Focus state for append/prepend inputs
    $('.input-group').on('focus', '.form-control', function () {
        $(this).closest('.input-group, .form-group').addClass('focus');
    }).on('blur', '.form-control', function () {
            $(this).closest('.input-group, .form-group').removeClass('focus');
        });

    var Searchbox = Backbone.View.extend({

        initialize: function() {
            //debugger;
        },

        events: {
            "keyup .searchfield" : "search"
        },

        search: function(event) {
            var query = this.getQuery();

            // hide event login-screen
            $(".login-screen").slideUp({duration: 250});
            this.$el.stop().animate( {marginTop: "3em"}, {duration:250});



            var view = this;
            // do search, display loading on all ajax, base view override?
            this.waitAndThen(function(){
                view.trigger("search:query", query);
            }, 200);

        },


        getQuery: function() {
            return this.$(".searchfield").val();
        },

        waitAndThen: (function() {
            var timer = 0;
            return function(callback, ms){
                clearTimeout (timer);
                timer = setTimeout(callback, ms);
            };
        })()


    });

    var SearchResults = Backbone.View.extend({

        initialize: function() {
            this.on("search:query", function(query){
                this.model.set("query", query);
            }, this);
            this.model.on("change:query", this.search, this);
        },

        search: function() {

            this.model.fetch();
        }
    });

    var Film = Backbone.Model.extend({

    });

    var Films = Backbone.Collection.extend({
        model: Film
    });

    var FilmResults = Backbone.Model.extend({
        url: function() {
            return "http://127.0.0.1:3000/search/" + this.get("query");
        },

        parse: function(response) {

            var setHash = response || {};

            debugger;

            if (response.results) {
                setHash.results = new Films(response.results);
            }

            return setHash;
        }
    });

    var filmResults = new FilmResults();

    var searchResults = new SearchResults({el: $(".search-results"), model: filmResults});

    var searchbox = new Searchbox({el: $(".searchbox")});
    searchbox.on("search:query", function(query){
        searchResults.trigger("search:query", query);
    })




});