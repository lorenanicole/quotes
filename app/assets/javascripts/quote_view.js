function QuoteView(el, quote) {
  this.$el = el;

  this.quote = quote;

  var self = this;
  this.$el.find("#quote_body").on('keyup', function(e) {
    self.bodyChanged();
  });

  $("#new_quote").on('submit', function(e) {
    e.preventDefault();
    self.formSubmitted();
  });
}

QuoteView.prototype.formSubmitted = function() {
  this.updateQuote();

  var self = this;
  if(!this.quote.isOverLimit()) {
    this.quote.save().done(function() {
      self.$el[0].reset();

      self.updateQuote();
      self.updateLengthStatus();
    })
  } else {
    alert("Whoa there cowgirl, keep it short!");
  }
}

QuoteView.prototype.updateQuote = function(overwrite) {
  this.quote.body = this.$el.find("#quote_body").val();
  this.quote.author = this.$el.find("#quote_author").val();
}

QuoteView.prototype.bodyChanged = function() {
  this.updateQuote();

  this.updateLengthStatus();
}

QuoteView.prototype.updateLengthStatus = function() {
  this.$el.find("#count").html(this.quote.body.length);

  if(this.quote.isOverLimit()) {
    this.$el.find("#body-length-status").addClass("over-limit");
  } else {
    this.$el.find("#body-length-status").removeClass("over-limit");
  }
}
