<template>
    <div class="form-wrapper">
        <h1>Blog Create</h1>
        
        <div class="form-divider"></div>

        <form>
            <div class="blog-form-group">
                <label for="blogTitle">Blog Title: </label>
                <input type="text" id="blogTitle" placeholder="INSERT BLOG TITLE HERE..." />
            
            </div>

            <div class="blog-form-group">
                <label for="blogDescription">Blog Description: </label>
                <textarea type="text" id="blogDescription" placeholder="INSERT BLOG TITLE HERE..." />
            </div>

            <div class="blog-form-checkbox">
                <label for="isHidden">Is Blog Hidden? </label>
                <input type="checkbox" id="isHidden" checked/>
            </div>
            
            <button class="form-button">Create</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            blog : {
                title: '',
                description: '',
                isHidden: true,
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .blog-form-group { 
        
        padding: 15px;

        input, textarea {
            width: 100%;
            height: 25px;
            outline: none;
            border: none;
            box-shadow: 0 1px 6px rgba(0,0,0,.3); 
        }

        textarea {
            width: 100%;
            height: 90px;
        }

        label {
            float: left;
        }

    }

    .blog-form-checkbox {
        float: left;
        padding: 15px;
    }
</style>
