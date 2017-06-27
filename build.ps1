$path = Split-Path -Parent $MyInvocation.MyCommand.Definition
rm $path\docs\* -recurse -exclude CNAME
cp $path\src\* $path\docs ¨Crecurse

$result = Get-ChildItem $path\docs -recurse *.styl | Where-Object { $_.BaseName -match '^[^_].*?' }

Foreach($file in $result)
{
	$out = Split-Path -Parent $file.FullName
	$out = -Join($out, "\", $file.BaseName, ".css")
	stylus $file.FullName -o $out
}

$result = Get-ChildItem $path\docs -recurse *.styl | %{$_.FullName}
Foreach($file in $result)
{
	rm $file
}