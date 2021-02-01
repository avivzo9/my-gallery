'use strict';

$(document).ready(init);
var gModalNum = 1;

function init() {
    renderPrevious();
}

function renderPrevious() {
    var projects = getProjects();
    var strHtml = '';
    strHtml += projects.map(function(pro) {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" onclick="renderModal(${pro.proName})" href="#portfolioModal1">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="${pro.img}" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${pro.proName}</h4>
          <p class="text-muted">${pro.title}</p>
        </div>
      </div>`
    }).join('')
    $('.port').html(strHtml);
}

function renderModal(pro) {
    console.log('pro:', pro)
    $('.modal-body h2').html(pro)
}