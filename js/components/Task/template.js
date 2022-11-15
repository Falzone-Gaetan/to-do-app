export default function (task) {
    return `
    <li data-id="${ task.id }" class="${ task.completed ? 'completed' : ''}">
        <div class="view">
            <input class="toggle" type="checkbox"${ task.completed ? 'checked' : ''}>
            <label>${ task.content }</label>
            <button class="destroy"></button>
        </div>
    </li>
    `;
}