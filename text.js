function createhtml(fresh) {
    //    google.script.run.withSuccessHandler(function(arr){
    var data = editwright(useremail, psswd, fresh);
    editcol = data[1];
    var editw = "none";
    viewcol = data[0];
    create = data[2];
    dlt = data[3];
    email = data[4];
    cond = data[5];

    // console.log('fresh ', fresh)
    //enable input button
    if (create && !isViewtable) {
        document.getElementById("input_button").style.display = "block";
        var existurl = document.getElementById("input_button").href;
        document.getElementById("input_button").href =
            existurl + "&user=" + useremail + "&pass=" + psswd;
    }
    //enable delete button
    if (dlt && !isViewtable) {
        document.getElementById("delete_button").style.display = "block";
    }
    //enable edit button
    if (editcol.length > 0 && !isViewtable) {
        document.getElementById("Edit_button").style.display = "block";
        document.getElementById("chkall").style.display = "";
        document.getElementById("refresh").style.display = "block";
        document.getElementById("sendrem").style.display = "";
        editw = "";
    }
    var checkPS = false;
    if (vp === "" || user) {
        checkPS = true;
    } else {
        //var psswrd = prompt("Enter password to view", "Password");
        //checkPS = psswrd.toLowerCase()==vp.toLowerCase()? true: false;
    }
    if (viewcol.length > 0) {
        if (cond.indexOf(":") > -1 && fresh != 3) {
            var main_data = [...tabledata];
            var andcnt = cond.length - cond.split(",").join("").length;
            var orcnt = cond.length - cond.split(";").join("").length;
            var filterData;

            if (andcnt >= 0 && orcnt == 0) {
                try {
                    depCol = cond.split(",");
                } catch (err) {
                    depCol = [cond];
                }

                for (var s1 = 0; s1 < depCol.length; s1++) {
                    var condition = depCol[s1].split(":")[1];
                    var cond_col = Number(depCol[s1].split(":")[0]);
                    if (condition == "NULL") {
                        filterData = main_data.filter(function (s) {
                            return s[cond_col] == "" || s[0] == "Record #";
                        });
                    } else if (condition == "NOT NULL") {
                        filterData = main_data.filter(function (s) {
                            return s[cond_col] !== "" || s[0] == "Record #";
                        });
                    } else {
                        filterData = main_data.filter(function (s) {
                            return s[cond_col] == condition || s[0] == "Record #";
                        });
                    }

                    main_data = filterData;
                }
                tabledata = main_data;
            } else if (andcnt == 0 && orcnt >= 1) {
                depCol = cond.split(";");
                var orwaladata = [];
                main_data.forEach(function (rowdata) {
                    for (var r = 0; r < depCol.length; r++) {
                        var depcol = depCol[r];
                        var cond_col = Number(depcol.split(":")[0]);
                        var condition = depcol.split(":")[1];
                        if (condition == "NULL" && rowdata[cond_col] == "") {
                            orwaladata.push(rowdata);
                            break;
                        } else if (condition == "NOT NULL" && rowdata[cond_col] !== "") {
                            orwaladata.push(rowdata);
                            break;
                        } else if (rowdata[cond_col] == condition) {
                            orwaladata.push(rowdata);
                            break;
                        } else if (rowdata[0] == "Record #") {
                            orwaladata.push(rowdata);
                            break;
                        }
                    }
                });

                main_data = orwaladata;
            }
            tabledata = main_data;
            datags.values = main_data;
        } else {
            var main_data = tabledata;
        }

        $(".file").html(datags.sheetName);
        $(".row-output").html(
            '<input type="hidden" class  ="form-control" name="state" id="maxRows" value=' +
            rowC +
            " disabled>"
        );
        var tfoot = [];
        var fields = datags.previousStoreData;
        var colsize = datags.colsize;

        var recordno = datags.recordno;

        var color = datags.color;
        var fontcolor = datags.fontcolor;
        if (fresh == 1) {
            var stages = datags.stagename;

            var shift_name = document.getElementById("stagelsit");
            stages.forEach(function (r) {
                var option = document.createElement("option");
                option.textContent = r[0];

                console.log("option", option);

                shift_name.appendChild(option);
            });
        }

        // console.log('fresh ', fresh)
        // console.log('isViewtable ', isViewtable)
        // console.log("datatype",datatype)
        var drparr = datags.drparr;
        var row =
            '<table class="table freeze-table table-striped table-bordered" id="table-id" style="font-size:80%;width: 100%;">';
        row += '<tbody id="tbody">'; // my line...

        if (end >= tabledata.length) {
            end = tabledata.length - 1;
        }
        // console.log(strt +" to "+ end)
        var cnt = 0,
            striped = 0;
        for (var i = strt; i <= end; i++) {
            var orderno = tabledata[i][0];

            if (i != strt) {
                cnt++;
                if (striped % 2 == 0) {
                    var background = "#f2f2f2";
                } else {
                    var background = "white";
                }

                if (recordno.indexOf(Number(orderno)) > -1) {
                    var background = "grey";
                } else if (colorformating) {
                    var coln = formatcolor[0][0];
                    var val = tabledata[i][coln];
                    var background = colorobj[val];
                }

                striped++;
                if (cnt > datags.defaultrow) {
                    var hide = "none";
                } else {
                    var hide = "";
                }
                var id = "tr" + (i - 1);
                row +=
                    '<tr id="' +
                    id +
                    '" style="display:' +
                    hide +
                    ";background:" +
                    background +
                    '">';
            } else {
                row += '<thead id="theadRow"><tr>';
            }

            // console.log("orderno",orderno);
            // console.log("tabledata",tabledata);
            var margin = 130;
            for (var j = 0; j < tabledata[i].length; j++) {
                //size declare---------------------
                try {
                    var size = colsize[j][0] + "px";
                    var sizenum = colsize[j][0];
                } catch (err) {
                    var size = "100px";
                    var sizenum = 100;
                }

                if (size == "px") {
                    size = "100px";
                    sizenum = 100;
                }

                var temp = false;
                for (var x = 0; x < fields.length; x++) {
                    if (
                        (fields[x][1] == tabledata[0][j] && fields[x][0] == j) ||
                        viewcol.indexOf(j) == -1
                    ) {
                        temp = true;
                        break;
                    }
                }

                if (j == 0) {
                    temp = false;
                }

                if (!temp) {
                    if (i != strt) {
                        if (j == 0) {
                            if (fresh == 4 || isViewtable) {
                                row +=
                                    '<td style="width:' +
                                    size +
                                    ';white-space: nowrap; overflow: hidden;">' +
                                    tabledata[i][j] +
                                    "</td>";
                                continue;
                            }
                            row +=
                                '<td class="col-id-no fixCol" style="position: sticky;background:white;text-align:center;margin-left:0px"><div style="display:flex;justify-content: space-around;"><div><i style="font-size:122%;display:' +
                                editw +
                                '" title="Edit" class="fas fa-edit" id="Edit_button" onclick="clickchk(' +
                                i +
                                ',this)"></i></div><div><input id="' +
                                i +
                                '" type="checkbox" /></div><div></td>';
                            row +=
                                '<td style="position: sticky;z-index:1000;background:white;left:60px;" class="col-first-name fixCol">' +
                                tabledata[i][j] +
                                "</td>";
                            continue;
                        } else if (j <= datags.freeze_col && fresh != 4 && !isViewtable) {
                            row +=
                                '<td class="col-first-name fixCol" style="max-width:' +
                                size +
                                "!important; min-width:" +
                                size +
                                "!important;position: sticky;white-space:nowrap; overflow: hidden; background:white; left:" +
                                margin +
                                'px;">';
                            margin = margin + sizenum;
                        } else {
                            row +=
                                '<td style="max-width:' +
                                size +
                                "!important; min-width:" +
                                size +
                                '!important; white-space: nowrap; overflow: hidden;">';
                        }

                        if (datatype[j][0] == "file") {
                            if (String(tabledata[i][j]).indexOf("http") > -1) {
                                row +=
                                    '<p style="width:' +
                                    size +
                                    ';margin-bottom: 0px; !important">';
                                var linkarr = String(tabledata[i][j]).split(",");
                                linkarr.forEach(function (z) {
                                    row +=
                                        '<a class="fileclass1"  href="' +
                                        z +
                                        '" data-col="' +
                                        j +
                                        '" target="_blank">Click Here </a>';
                                });
                                row +=
                                    '</p><input links="' +
                                    tabledata[i][j] +
                                    '" class="inputField dtValue fileclass2" style="display:none;width:' +
                                    size +
                                    '" data-row="' +
                                    i +
                                    '" data-col="' +
                                    j +
                                    '" type="file"  disabled onchange="handleFileSelect(this,' +
                                    i +
                                    "," +
                                    j +
                                    ')" multiple/></td>';
                            } else {
                                row +=
                                    '<p style="width:' +
                                    size +
                                    ';margin-bottom: 0px; !important"><a class="fileclass1" href="blank" data-col="' +
                                    j +
                                    '"></a></p><input value="' +
                                    tabledata[i][j] +
                                    '" class="inputField dtValue fileclass2" style="display:none;width:' +
                                    size +
                                    ';" data-row="' +
                                    i +
                                    '" data-col="' +
                                    j +
                                    '" type="file" disabled onchange="handleFileSelect(this,' +
                                    i +
                                    "," +
                                    j +
                                    ')" multiple/></td>';
                            }
                            continue;
                        } else if (datatype[j][0] == "htmlformula") {
                            row += tabledata[i][j] + "</td>";
                        } else if (
                            datatype[j][0] == "checkbox" &&
                            tabledata[i][j] == "TRUE"
                        ) {
                            row +=
                                '<input type="' +
                                datatype[j][0] +
                                '" class="inputField dtValue" data-row="' +
                                i +
                                '" data-col="' +
                                j +
                                '" type="text" value="' +
                                tabledata[i][j] +
                                '" class="dtValue" disabled style="width:' +
                                size +
                                ';" checked></td>';
                        } else if (datatype[j][0] == "checkbox") {
                            row +=
                                '<input type="' +
                                datatype[j][0] +
                                '" class="inputField dtValue" data-row="' +
                                i +
                                '" data-col="' +
                                j +
                                '" type="text" value="' +
                                tabledata[i][j] +
                                '" class="dtValue" disabled style="width:' +
                                size +
                                '; text-align: center; white-space: nowrap;" ></td>';
                        } else if (String(tabledata[i][j]).indexOf("http") > -1) {
                            row +=
                                '<p style="width:' +
                                size +
                                ';margin-bottom: 0px; !important" id="plnk' +
                                i +
                                j +
                                '">';
                            var linkarr = String(tabledata[i][j]).split(",");
                            linkarr.forEach(function (z) {
                                row +=
                                    '<a class="linkclass1"  href="' +
                                    z +
                                    '" data-col="' +
                                    j +
                                    '" target="_blank">Click Here </a>';
                            });

                            row +=
                                '</p><input class="inputField dtValue linkclass2" id="lnk' +
                                i +
                                j +
                                '" style="display:none;width:' +
                                size +
                                ';box-sizing: border-box;" data-row="' +
                                i +
                                '" data-col="' +
                                j +
                                '" type="text" value="' +
                                tabledata[i][j] +
                                '" class="dtValue" disabled></td>';
                        } else if (datatype[j][0] == "" && isViewtable) {
                            row += tabledata[i][j] + "</td>";
                        } else if (
                            datatype[j][0] == "dropdown_Itm" ||
                            datatype[j][0] == "dropdown_Rng"
                        ) {
                            var drpid = "drp" + i + j;
                            row += `<input type="${datatype[j][0]
                                }" class="inputField dtValue dropdown" style="width:${size};box-sizing: border-box;" data-row="${i}" data-col="${j}" type="text" value="${tabledata[i][j]
                                }" class="dtValue" disabled><select id="${drpid}" data-col="${j}" name="sel time" class="formData dropdownedit" style="display:none;width:${size};" row="${i}" onchange="createdropdown('${drpid}',${i},${datags.depend[
                                    j - 1
                                ].join(",")});">`;
                            //<option value="0" >--Select Type--</option>

                            var txt = drparr[j][0];

                            var arr = txt.split(",");

                            arr.forEach(function (r) {
                                row += "<option>" + r + "</option>";
                            });

                            row += "</select></td>";
                        } else if (datatype[j][0] == "dropdown-search") {
                            var drpid = "drp" + i + j;
                            row += `<input type="${datatype[j][0]
                                }" class="inputField dtValue dropdown" style="width:${size};box-sizing: border-box;" data-row="${i}" data-col="${j}" type="text" value="${tabledata[i][j]
                                }" class="dtValue" disabled><input id="${drpid}" data-col="${j}" name="sel time" class="formData dropdownedit" style="display:none;width:${size};" row="${i}" onchange="createdropdown('${drpid}',${i},${datags.depend[
                                    j - 1
                                ].join(",")});" List="list${drpid}" autocomplete="off" >`;
                            //<option value="0" >--Select Type--</option>

                            var txt = drparr[j][0];

                            var arr = txt.split(",");
                            row += '<datalist id="list' + drpid + '">';

                            arr.forEach(function (r) {
                                row += "<option>" + r + "</option>";
                            });

                            row += "</datalist></td>";
                        } else if (datatype[j][0] == "dropdown-dependent") {
                            var drpid = "drp" + i + j;
                            row += `<input type="${datatype[j][0]
                                }" class="inputField dtValue dropdown" style="width:${size};box-sizing: border-box;" data-row="${i}" data-col="${j}" type="text" value="${tabledata[i][j]
                                }" class="dtValue" disabled><select id="${drpid}" data-col="${j}" name="sel time" class="formData dropdownedit" style="display:none;width:${size};" row="${i}" onchange="createdropdown('${drpid}',${i},${datags.depend[
                                    j - 1
                                ].join(",")});">`;

                            var txt = drparr[j];

                            var arr = txt.filter(function (r) {
                                return r[0] == tabledata[i][datags.change[j - 1][0]];
                            });

                            arr.forEach(function (r) {
                                row += "<option>" + r[1] + "</option>";
                            });

                            row += "</select></td>";
                        } else if (
                            datatype[j][0] == "datetime-local" ||
                            datatype[j][0] == "TS_Formula" ||
                            datatype[j][0] == "TS_MANUAL" ||
                            datatype[j][0] == "TS_TAT" ||
                            datatype[j][0] == "TS_Data"
                        ) {
                            row +=
                                '<input type="datetime-local" class="inputField dtValue" data-row="' +
                                i +
                                '" data-col="' +
                                j +
                                '" type="text" value="' +
                                tabledata[i][j].replace(" ", "T") +
                                '" class="dtValue" disabled style="width:' +
                                size +
                                ';box-sizing: border-box;"></td>';
                        } else if (
                            datatype[j][0] == "textarea" ||
                            datatype[j][0] == "formula"
                        ) {
                            row +=
                                '<textarea class="inputField dtValue" data-row="' +
                                i +
                                '" data-col="' +
                                j +
                                '" class="dtValue" disabled style="width:' +
                                size +
                                ';height: 23px;box-sizing: border-box;">' +
                                tabledata[i][j] +
                                "</textarea></td>";
                        } else if (datatype[j][0] == "phone") {
                            row +=
                                '<input type="number" class="inputField dtValue" data-row="' +
                                i +
                                '" data-col="' +
                                j +
                                '"  value="' +
                                tabledata[i][j] +
                                '" class="dtValue" disabled style="width:' +
                                size +
                                '"></td>';
                        } else {
                            row +=
                                '<input type="' +
                                datatype[j][0] +
                                '" class="inputField dtValue" data-row="' +
                                i +
                                '" data-col="' +
                                j +
                                '"  value="' +
                                tabledata[i][j] +
                                '" class="dtValue" disabled style="max-width:' +
                                size +
                                "!important; min-width:" +
                                size +
                                '!important; box-sizing: border-box;"></td>';
                        }
                    } else {
                        if (j == 0 && fresh != 4 && !isViewtable) {
                            var thid = "th" + thcount;
                            // if(fresh==4){
                            //   row += '<th onmouseover="showSortIcon(this);" onmouseout="hideSortIcon(this);" id="'+thid+'" class="" style="z-index:10000;background-color:'+color[j]+';color: '+fontcolor[j]+';column-width:'+size+';white-space: normal">' + tableheader[j] + '<i class="fas fa-sort" style="padding-left:10px;display:none;"></i></th>';
                            //  thcount++;
                            //   continue;
                            // }

                            row +=
                                "<th style='z-index:1000;' class='col-id-no fixed-header'>CheckBox</th>";
                            row +=
                                '<th onmouseover="showSortIcon(this);" onmouseout="hideSortIcon(this);" id="' +
                                thid +
                                '" class="col-first-name fixed-header" style="position: sticky;z-index:10000;left:60px;">' +
                                tableheader[j] +
                                '<i class="fas fa-sort" style="padding-left:10px;visibility: hidden;"></i></th>';
                            thcount++;
                        } else if (j <= datags.freeze_col && fresh != 4 && !isViewtable) {
                            var thid = "th" + thcount;
                            row +=
                                '<th onmouseover="showSortIcon(this);" onmouseout="hideSortIcon(this);" id="' +
                                thid +
                                '" class="col-first-name fixed-header" style="position: sticky;z-index:1000;left:' +
                                margin +
                                "px !important; background-color:" +
                                color[j] +
                                ";color: " +
                                fontcolor[j] +
                                ";column-width:" +
                                size +
                                ';white-space: normal">' +
                                tableheader[j] +
                                '<i class="fas fa-sort" style="padding-left:10px;visibility: hidden;"></i></th>';
                            margin = margin + sizenum;
                            thcount++;
                        } else {
                            var thid = "th" + thcount;
                            thcount++;

                            // if(fresh == 4){
                            //   row += '<th onmouseover="showSortIcon(this);" onmouseout="hideSortIcon(this);" id="'+thid+'" class="fixed-header" style="background-color:#42C0FB;color: #ffffff;column-width:'+size+';white-space: normal">' + tableheader[j] + '<i class="fas fa-sort" style="padding-left:10px;display:none;"></i></th>';
                            //   continue;
                            // }
                            if (fresh == 4 || isViewtable) {
                                row +=
                                    '<th onmouseover="showSortIcon(this);" onmouseout="hideSortIcon(this);" id="' +
                                    thid +
                                    '" class="fixed-header" style="background-color:#42C0FB;color: #ffffff;column-width:' +
                                    size +
                                    ';white-space: normal; padding: 10px; height: 50px;">' +
                                    tableheader[j] +
                                    '<i class="fas fa-sort" style="padding-left:10px;visibility: hidden;"></i></th>';
                                continue;
                            }

                            row +=
                                '<th onmouseover="showSortIcon(this);" onmouseout="hideSortIcon(this);" id="' +
                                thid +
                                '" class="fixed-header" style="background-color:' +
                                color[j] +
                                ";color: " +
                                fontcolor[j] +
                                ";column-width:" +
                                size +
                                ';white-space: normal">' +
                                tableheader[j] +
                                '<i class="fas fa-sort" style="padding-left:10px;visibility: hidden;"></i></th>';
                        }
                    }
                }
                //not hidden condition-------------
                else {
                    if (i != strt) {
                        if (j == 0) {
                            row +=
                                '<td class="" style="display:none">' +
                                tabledata[i][j] +
                                "</td>";
                        } else {
                            if (datatype[j][0] == "file") {
                                if (String(tabledata[i][j]).indexOf("http") > -1) {
                                    row +=
                                        '<td style="white-space:nowrap; overflow: hidden; display:none"><p style="width:' +
                                        size +
                                        ';margin-bottom: 0px; !important"><a href="' +
                                        tabledata[i][j] +
                                        '" data-col="' +
                                        j +
                                        '">Click Here</a></p><input links="' +
                                        tabledata[i][j] +
                                        '" class="inputField dtValue " style="display:none;width:' +
                                        size +
                                        '" data-row="' +
                                        i +
                                        '" data-col="' +
                                        j +
                                        '" type="file"  disabled onchange="handleFileSelect(this,' +
                                        i +
                                        "," +
                                        j +
                                        ')" multiple/></td>';
                                } else {
                                    row +=
                                        '<td style="white-space:nowrap; overflow: hidden; display:none"><p style="width:' +
                                        size +
                                        ';margin-bottom: 0px; !important"><a href="blank" data-col="' +
                                        j +
                                        '"></a></p><input links="' +
                                        tabledata[i][j] +
                                        '" class="inputField dtValue " style="display:none;width:' +
                                        size +
                                        '" data-row="' +
                                        i +
                                        '" data-col="' +
                                        j +
                                        '" type="file" disabled onchange="handleFileSelect(this,' +
                                        i +
                                        "," +
                                        j +
                                        ')" multiple/></td>';
                                }
                            } else if (datatype[j][0] == "htmlformula") {
                                row +=
                                    '<td class="" style="display:none">' +
                                    tabledata[i][j] +
                                    "</td>";
                            } else if (
                                datatype[j][0] == "checkbox" &&
                                tabledata[i][j] == "TRUE"
                            ) {
                                row +=
                                    '<td class="" style="display:none"><input type="' +
                                    datatype[j][0] +
                                    '" class="inputField dtValue" data-row="' +
                                    i +
                                    '" data-col="' +
                                    j +
                                    '" type="text" value="' +
                                    tabledata[i][j] +
                                    '" class="dtValue" disabled style="width:' +
                                    size +
                                    '" checked></td>';
                            } else if (
                                datatype[j][0] == "dropdown_Itm" ||
                                datatype[j][0] == "dropdown_Rng"
                            ) {
                                var drpid = "drp" + i + j;
                                row +=
                                    '<td style="display:none"><input type="' +
                                    datatype[j][0] +
                                    '"class="inputField dtValue dropdown" style="width:' +
                                    size +
                                    '" data-row="' +
                                    i +
                                    '" data-col="' +
                                    j +
                                    '" type="text" value="' +
                                    tabledata[i][j] +
                                    '" class="dtValue" disabled><select id="' +
                                    drpid +
                                    '" data-col="' +
                                    j +
                                    '" name="sel time" class="formData dropdownedit" style="display:none;width:' +
                                    size +
                                    ';" row="' +
                                    i +
                                    '">';
                                //<option value="0" >--Select Type--</option>

                                var txt = drparr[j][0];

                                var arr = txt.split(",");

                                arr.forEach(function (r) {
                                    row += "<option>" + r + "</option>";
                                });

                                row += "</select></td>";
                            } else {
                                row +=
                                    '<td class="" style="display:none"><input class="inputField dtValue" data-row="' +
                                    i +
                                    '" data-col="' +
                                    j +
                                    '" type="text" value="' +
                                    tabledata[i][j] +
                                    '" class="dtValue" disabled></td>';
                            }
                        }
                    } else {
                        var thid = "th" + thcount;
                        thcount++;
                        row +=
                            '<th  onmouseover="showSortIcon(this);" onmouseout="hideSortIcon(this);" id="' +
                            thid +
                            '" class="" style="display:none">' +
                            tableheader[j] +
                            '<i class="fas fa-sort" style="padding-left:10px;display:none;"></i></th>';
                    }
                }
            }

            if (i != 0) {
                row += "</tr>";
            } else {
                row += "</tr></thead>";
            }
        }
        row += "</tbody></table>";
        document.getElementById("output").innerHTML = row;

        // first create a tableHeader object...
        var allTr = document.getElementsByTagName("tr")[0];
        for (let t = 1; t < allTr.children.length; t++) {
            tableHeader[allTr.children[t].innerText] = t;
        }

        var trlength = tabledata;
        if (trlength.length - 1 > datags.defaultrow) {
            document.getElementsByClassName("hrs")[0].style.display = "";
            showHrsOrHide = 1;
        } else {
            document.getElementsByClassName("hrs")[0].style.display = "none";
        }
        sortingTable();
        // if(!isViewtable){

        // }
        main_data.splice(0, 1);
        allDataSheet = main_data;

        if (fresh == 1) {
            createfilter();
        }
    } else {
        localStorage.removeItem(keyname);
        Swal.fire({
            icon: "error",
            title:
                "You have logged in with " +
                email +
                "\n this email id is not authorized.",
        });
        //window.open(<?=url?>+'?page=View Table', '_top');
    }

    //}).editwright(useremail,psswd);
}
