exports.index = function(req, res){
  
  res.render('index',{page_title:"Index Page"});
  
};

exports.list = function(req, res){
  req.getConnection(function(err,connection){
     connection.query('SELECT * FROM bekup_cto',function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );  
        res.render(
            'viewcategory',
            { 
              page_title:"Sample list view database",
              data:rows
            }
        );
                           
    });
  });
  
};

exports.save = function(req, res){
  var input = JSON.parse(JSON.stringify(req.body));
  var data  = 
  {
     fullname:input.fullname,
     role:input.role
  };

  var id = req.body.id || 0;

  req.getConnection(function(err,connection){
    if(id == 0) {
     connection.query('INSERT INTO bekup_cto (fullname, role) VALUES (?, ?)', [data.fullname, data.role], function(err,rows) { 

          if(err)
             console.log("Error Inserting : %s ",err );  
          res.redirect('/');

      });
    }
    else{
      connection.query('UPDATE bekup_cto SET ? WHERE id = ?', [data.fullname, data.role, id], function(err,rows) { 
          
          if(err)
             console.log("Error Updating : %s ",err );  
          res.redirect('/');

      });
    }

  });
  
};

exports.edit = function(req, res){
  req.getConnection(function(err,connection){
     connection.query('SELECT * FROM bekup_cto WHERE id = ?', [req.params.userid], function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );  
        res.render(
          'viewcategory',
          {
            page_title: "Sample edit view database",
            data: rows
          }
        );
                           
    });
  });
  
};

exports.delete = function(req, res){
  req.getConnection(function(err,connection){
     connection.query('DELETE FROM bekup_cto WHERE id = ?', [req.params.userid], function(err,rows)     {
            
        if(err)
           console.log("Error Deleting : %s ",err );  
        res.redirect('/');
                           
    });
  });
  
};
