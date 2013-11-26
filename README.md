About
===

"AutoRefresh" is a QlikView Document Extension which enables you to force a UI-refresh of a QlikView application every given seconds.

Installation
---
Download the .qar file and double-click on it (if you are using QlikView Desktop), otherwise extract the content of the .qar file and copy it to the location where QlikView server expects QlikView Document Extensions.

Detailed instruction on installing and deploying QlikView Extensions can be found [here](http://www.qlikblog.at/1597/qliktip-40-installingdeploying-qlikview-extensions/).

Installation & Configuration
---
Configuration of the extension works in two steps:



1. Add the document extension to your document
2. Configure the extension's behavior

### Adding the Extension to your QlikView Document
To add a Document Extension, open the `Document Properties` by selecting `Settings` > `Document Properties`. Then navigate to the `Extensions` tab and select the document extensions that you wish to add from the `Installed Extensions` list and double-click them to add them to the `Active Extensions` list.

### Configuration
Configuration is easy, just add a variable to the QlikView document named `vAutoRefresh_EveryXSeconds`.
Setting the integer value of this variable (e.g. `10` means 10 seconds) will define how often the UI will be refreshed.

Furthermore you can set up an additional variable - named `vAutoRefresh_NextRefresh` - which will be updated with a timestamp indicating when the next refresh is scheduled (the variable will be updated immediately after the refresh is triggered).



## Further Information

### Compatiblity
This QlikView Object Extension is only developed and tested with QlikView 11 SR2 or higher.

### Change Log
* v1.0.0 (11/26/2013) - Initial version
 
### License
The software is made available "AS IS" without any warranty of any kind under the MIT License (MIT).
Since this is a private project QlikTech support aggreement does not cover support for this software. 

### Credits
Copied explanation how to add a document extension from [http://www.qlikfix.com/2012/07/03/qlikview-extension-tutorials-documentation-and-examples/
](http://www.qlikfix.com/2012/07/03/qlikview-extension-tutorials-documentation-and-examples/)






