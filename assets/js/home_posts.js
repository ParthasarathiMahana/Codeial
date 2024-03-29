{
    // method to submit post data using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">x</a>
                <li>
                    ${post.content}
                </li>
                <small>
                ${post.user.name}
                </small>
                <div class="post-comments">
                        <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="type here to add comment...">
                            <input type="hidden" value="${post._id}" name="post">
                            <input type="submit" value="add comment">
                
                        </form>

                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                                
                            </ul>
                        </div>

                </div>
                
    </li>`)
    }



    // method to delete a post from dom
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove()

                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }


    createPost();
}