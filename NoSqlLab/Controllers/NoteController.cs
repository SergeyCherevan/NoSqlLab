using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoSqlLab.Model;
using NoSqlLab.Repositories;

namespace NoSqlLab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : Controller
    {
        private readonly UserRepository userRepository;
        private readonly NoteRepository noteRepository;

        public NoteController(UserRepository userRepository, NoteRepository noteRepository)
        {
            this.userRepository = userRepository;
            this.noteRepository = noteRepository;
        }

        [HttpGet]
        [Route("get")]
        public IActionResult Get(string id)
        {
            return Ok(noteRepository.GetById(new Guid(id)));
        }

        [HttpGet]
        [Route("getByUserId")]
        public IActionResult GetByUserId(Guid id)
        {
            return Ok(noteRepository.GetByUserId(id));
        }

        [HttpPost]
        [Route("add")]
        [Authorize]
        public IActionResult Add(NoteApiModel nam)
        {
            User user = userRepository.GetByUsername(User.Identity.Name);

            return Ok(noteRepository.Insert(new Note()
            {
                Id = new Guid(),
                Title = nam.Title,
                Text = nam.Text,
                UserId = user.Id,
                LastUpdate = DateTime.UtcNow,
            }));
        }

        [HttpPost]
        [Route("edit")]
        [Authorize]
        public IActionResult Edit(EditNoteModel enm)
        {
            User user = userRepository.GetByUsername(User.Identity.Name);
            Note note = noteRepository.GetById(enm.Id);

            if (note.UserId != user.Id)
            {
                return BadRequest("This note is not yours");
            }

            note.Text = enm.Text;
            return Ok(noteRepository.Edit(enm.Id, note));
        }

        [HttpDelete]
        [Route("delete")]
        [Authorize]
        public IActionResult Delete(string id)
        {
            User user = userRepository.GetByUsername(User.Identity.Name);
            Note note = noteRepository.GetById(new Guid(id));

            if (note.UserId != user.Id)
            {
                return BadRequest("This note is not yours");
            }

            noteRepository.Delete(note.Id);
            return Ok();
        }
    }
}
