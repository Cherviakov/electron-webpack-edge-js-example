### Electron webpack edge-js example

[Edge-js](https://github.com/agracio/edge-js) is library to run c# or 
dotnet scripts from nodeJS, it is working with node more or less 
(I managed to run it with dotnet but not with mono on linux), but 
when have to run it with electron + webpack stack I got problems.

Essentially problem was with webpack, trying to bundle native addon
it then report file required not found and node-loader not helped in
this case. Therefore it appears that need to require edge-js outside
of webpack.

This was done with copy-webpack-plugin and no-webpack-require, so we
just copy whole edge-js package to output folder and then require it
from built main.js file.

This solution is crude but it is working.
