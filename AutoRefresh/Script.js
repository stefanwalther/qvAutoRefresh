// ------------------------------------------------------------------
// "AutoRefresh" QlikView Document Extension
// ~~
// "AutoRefresh" is a QlikView Document Extension which enables you to 
// add the ability to a QlikView application that it will be refreshed 
// automatically every X seconds.
// ------------------------------------------------------------------
// Copyright
// ~~
// Stefan Walther - 11/26/2013
//
// ~~
// DOCUMENTATION:
//      https://github.com/stefanwalther/QlikView-Extension-AutoRefresh/
// ~~
// SOURCE CODE:
//      https://github.com/stefanwalther/QlikView-Extension-AutoRefresh/
// ~~
// LICENSE:
//      MIT License
// ------------------------------------------------------------------

Qva.AddDocumentExtension('AutoRefresh', function () {

    // Definition of variable names to control the behavior of the AutoRefresh extension.
    var cRefreshInterval_VariableName = 'vAutoRefresh_EveryXSeconds';
    var cNextRefresh_VariableName = 'vAutoRefresh_NextRefresh';

    var enableConsoleOutput = false;

    var _this = this;
    _this.ExtSettings = {};
    _this.ExtSettings.RefreshInterval = 10;  //Default value in seconds
    //ConsoleDebug(_this);


    function Init() {
        ConsoleLog('Initialize AutoRefresh extension ...', false);

        // Before starting with the extension, fetch the settings for this
        // extension, set by the two variables on document-level 
        // (vAutoRefresh_EveryXSeconds)
        RetrieveRefreshInterval(function () {

            ConsoleLog('Refresh Interval: ' + _this.ExtSettings.RefreshInterval, enableConsoleOutput);
            var refreshInterval = _this.ExtSettings.RefreshInterval;

            // Always set the next refresh date immediately, otherwise AutoRefreshCountdown
            // will not be able to display the countdown correctly
            //var t = new Date();
            //setNextRefreshDate(t.setSeconds(t.getSeconds() + refreshInterval));

            var timerId = setInterval(function () {

                var nextRefreshDate = new Date();
                nextRefreshDate.setSeconds(nextRefreshDate.getSeconds() + _this.ExtSettings.RefreshInterval);

                ConsoleLog('Next Refresh (from AutoRefresh): ' + getFormattedDate(nextRefreshDate), enableConsoleOutput);

                setNextRefreshDate(nextRefreshDate);

            }, (refreshInterval * 1000));
            _this.ExtSettings.TimerId = timerId;

            ConsoleLog('Finished AutoRefresh extension ...');
        }, enableConsoleOutput); // (RetrieveRefreshInterval Callback)
    } // (Init)

    //_this.Document.SetOnUpdateComplete(function () {
        //clearInterval(_this.ExtSettings.TimerId);
    //});

    Init();

    function setNextRefreshDate(refreshDate) {
        _this.Document.SetVariable(cNextRefresh_VariableName, getFormattedDate(refreshDate).toString());
    }

    // ------------------------------------------------------------------
    // Extension helper functions
    // ------------------------------------------------------------------

    

    function getFormattedDate(date) {

        var str = date.getFullYear() + "-" + (date.getMonth() + 1).pad(2) + "-" + date.getDate().pad(2) + " " + date.getHours().pad(2) + ":" + date.getMinutes().pad(2) + ":" + date.getSeconds().pad(2);
        return str;
    }

    Number.prototype.pad = function (len) {
        return (new Array(len + 1).join("0") + this).slice(-len);
    }

    function RetrieveRefreshInterval(fnCallBack, enableConsoleOutput) {

        var qvDoc = Qv.GetCurrentDocument();
        qvDoc.GetAllVariables(function (vars) {

            for (var i = 0; i < vars.length; i++) {
                var obj = vars[i];

                if ((obj.isreserved == "false") && (obj.isconfig == "false")) {
                    ConsoleLog('Variable Loop: ' + obj.name + ' = ' + obj.value, enableConsoleOutput);

                    if (obj.name.toLowerCase() == cRefreshInterval_VariableName.toLowerCase()) {
                        try {
                            _this.ExtSettings.RefreshInterval = parseInt(obj.value);
                            ConsoleLog('Set variable value to ' + obj.value.toString(), enableConsoleOutput);
                        } catch (e) {
                            ConsoleError('Value of cRefreshInterval_VariableName is not a valid int value', enableConsoleOutput);
                        }
                        break;
                    }
                }
            }
            fnCallBack();
        });
    }

    function ConsoleLog(msg, enabled) {
        if (enabled && typeof console != "undefined") {
            console.log(msg);
        }
    }

    function ConsoleDebug(msg, enabled) {
        if (enabled && typeof console != "undefined") {
            console.debug(msg);
        }
    }

    function ConsoleError(msg, enabled) {
        if (enabled && typeof console != "undefined") {
            console.error(msg);
        }
    }

    function ConsoleInfo(msg, enabled) {
        if (enabled && typeof console != "undefined") {
            console.info(msg);
        }
    }

    function ConsoleTime(key, enabled) {
        if (enabled && typeof console != "undefined") {
            console.time(key);
        }
    }

    function ConsoleTimeEnd(key, enabled) {
        if (enabled && typeof console != "undefined") {
            console.timeEnd(key);
        }
    }

}, false);                 
