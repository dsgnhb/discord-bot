exports.voteOrVotes = function(likes) {
    if(likes == 1) return "Vote"
    else return "Votes"
}
exports.timeshort = function(date) {
    monthInt = date.getMonth()+1;
    year = date.getFullYear();
    return ""+ year + monthInt
}