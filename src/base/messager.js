define([], function(jQuery) {

    var messager = function() {
        this.layer = { 'width': 320, 'height': 144 };
        this.title = '信息提示';
        this.time = 6000;
        this.anims = { 'type': 'slide', 'speed': 600 };
        this.timer1 = null;
    };
    messager.prototype.inits = function(title, text) {
        var self = this;
        if ($("#message").is("div")) {
            return;
        }
        $(document.body).prepend('<div id="message" class="notifyBox" style="width:' + this.layer.width + 'px;height:' + this.layer.height + 'px;display:none;"><div class="notifyBoxHeader"><div id="message_close" class="notifyBoxClose">×</div><div class="notifyBoxTitle">' + title + '</div><div style="clear:both;"></div></div> <div style="padding-bottom:5px;border-top:none;width:100%;height:auto;font-size:12px;"><div id="message_content" style="margin: 25px 20px 25px 20px;position: relative;top: 0px;left: 0;z-index: 99999;' + (this.layer.width - 17) + 'px;height:' + (this.layer.height - 50) + 'px;color:#005EAB;text-align:left;overflow:hidden;">' + text + '</div></div></div>');
        $("#message_close").click(function() {
            setTimeout(self.close(), 1);
        });

        $("#message").hover(function() {
            clearTimeout(self.timer1);
            self.timer1 = null;
        }, function() {
            //self.timer1 = setTimeout(self.close(), self.time);
        });

    };

    messager.prototype.show = function(title, text, time) {
        var self = this;
        if ($("#message").is("div")) {
            return;
        }

        if (title == 0 || !title) title = this.title;

        this.inits(title, text);

        if (time >= 0) this.time = time;

        switch (this.anims.type) {
            case 'slide':
                $("#message").slideDown(this.anims.speed, function() {

                });
                break;
            case 'fade':
                $("#message").fadeIn(this.anims.speed);
                break;

            case 'show':
                $("#message").show(this.anims.speed);
                break;

            default:
                $("#message").slideDown(this.anims.speed);
                break;
        }
        self.rmmessage(self.time);
    };

    messager.prototype.lays = function(width, height) {

        if ($("#message").is("div")) {
            return;
        }

        if (width != 0 && width) this.layer.width = width;

        if (height != 0 && height) this.layer.height = height;

    }

    messager.prototype.anim = function(type, speed) {

        if ($("#message").is("div")) {
            return;
        }

        if (type != 0 && type) this.anims.type = type;

        if (speed != 0 && speed) {

            switch (speed) {

                case 'slow':
                    ;
                    break;

                case 'fast':
                    this.anims.speed = 200;
                    break;

                case 'normal':
                    this.anims.speed = 400;
                    break;

                default:

                    this.anims.speed = speed;
            }

        }

    }

    messager.prototype.rmmessage = function(time) {
        var self = this;
        if (time > 0) {
            this.timer1 = setTimeout(function() {
                self.close();
            }, time);
        }
    };
    messager.prototype.close = function() {
        switch (this.anims.type) {
            case 'slide':
                $("#message").slideUp(this.anims.speed);
                break;
            case 'fade':
                $("#message").fadeOut(this.anims.speed);
                break;
            case 'show':
                $("#message").hide(this.anims.speed);
                break;
            default:
                $("#message").slideUp(this.anims.speed);
                break;
        };
        setTimeout('$("#message").remove();', this.anims.speed);
        this.original();
    }

    messager.prototype.original = function() {

        this.layer = { 'width': 320, 'height': 144 };

        this.title = '信息提示';

        this.time = 6000;

        this.anims = { 'type': 'slide', 'speed': 600 };

    };
    window.messager = new messager();
})
