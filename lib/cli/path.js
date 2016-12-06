//path

//join path

function join_path(...parameters)
{
 return pkg.path.join.apply(null,parameters);
}

//real path

function real_path(path)
{
 return pkg.fs.realpathSync(path);
}

//relative path

function relative_path(path)
{
 return pkg.path.relative(process.cwd(),path);
}

//dir name

function dir_name(path)
{
 return pkg.path.dirname(path);
}

//base name

function base_name(path)
{
 return pkg.path.basename(path);
}

//file name

function file_name(path)
{
 return pkg.path.parse(path).name;
}
