Set objShell = CreateObject("WScript.Shell")
strPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
objShell.Run "powershell -NoExit -ExecutionPolicy Bypass -File """ & strPath & "\push.ps1""", 1, True
